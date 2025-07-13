import React, { useState, useEffect, useCallback, useMemo } from "react"
import { withStreamlitConnection, Streamlit, ComponentProps } from "streamlit-component-lib"
import { FiChevronRight, FiChevronDown } from "react-icons/fi"

// Enhanced type definitions
interface MenuItem {
  label: string
  key: string
  children?: MenuItem[]
  icon?: string
  disabled?: boolean
  badge?: string | number
}

interface AccordionItemProps {
  item: MenuItem
  selectedKey: string | null
  setSelectedKey: (key: string) => void
  level?: number
}

// Style constants
const styles = {
  container: {
    maxWidth: 520,
    margin: "0 auto",
    padding: 0,
    borderRadius: "1rem",
    fontFamily: "Source Sans, sans-serif",
    color: "#222",
  },
  baseItem: {
    cursor: "pointer",
    fontSize: "0.875rem",
    lineHeight: "28px",
    margin: "4px 0",
    padding: "0 8px",
    borderRadius: "0.5rem",
    color: "#222",
    userSelect: "none" as const,
    transition: "background-color 0.2s ease",
  },
  selectedItem: {
    backgroundColor: "#e5e7eb",
    fontWeight: "600",
  },
  hoverItem: {
    backgroundColor: "#e5e7eb",
  },
  disabledItem: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  badge: {
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "9999px",
    padding: "2px 6px",
    fontSize: "0.75rem",
    marginLeft: "8px",
  },
}

// Memoized AccordionItem component with accessibility improvements
const AccordionItem = React.memo<AccordionItemProps>(({ 
  item, 
  selectedKey, 
  setSelectedKey,
  level = 0 
}) => {
  const [open, setOpen] = useState(false)
  const isSelected = selectedKey === item.key
  const isDisabled = item.disabled || false

  // Toggle open/closed state with frame height adjustment
  const toggleOpen = useCallback(() => {
    if (isDisabled) return
    setOpen(prev => !prev)
    setTimeout(() => Streamlit.setFrameHeight(), 100)
  }, [isDisabled])

  // Handle item click with disabled check
  const onClickItem = useCallback((key: string) => {
    if (isDisabled) return
    setSelectedKey(key)
    Streamlit.setComponentValue(key)
  }, [setSelectedKey, isDisabled])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      action()
    }
  }, [])

  // Render expandable parent item with children
  if (item.children && item.children.length > 0) {
    return (
      <div style={{ marginBottom: 4 }}>
        <div
          role="button"
          tabIndex={isDisabled ? -1 : 0}
          aria-expanded={open}
          aria-label={`${item.label} menu, ${open ? 'expanded' : 'collapsed'}`}
          aria-disabled={isDisabled}
          style={{
            ...styles.baseItem,
            ...(isDisabled ? styles.disabledItem : {}),
            fontWeight: "400",
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onClick={toggleOpen}
          onKeyDown={(e) => handleKeyDown(e, toggleOpen)}
          onMouseEnter={e => {
            if (!isDisabled) {
              e.currentTarget.style.backgroundColor = styles.hoverItem.backgroundColor
            }
          }}
          onMouseLeave={e => {
            if (!isDisabled) {
              e.currentTarget.style.backgroundColor = "transparent"
            }
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: 8 }} aria-hidden="true">
              {open ? <FiChevronDown /> : <FiChevronRight />}
            </span>
            {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
            {item.label}
          </div>
          {item.badge && <span style={styles.badge}>{item.badge}</span>}
        </div>

        {open && (
          <ul 
            role="group"
            aria-label={`${item.label} submenu`}
            style={{ paddingLeft: 20, margin: 0, listStyle: "none" }}
          >
            {item.children.map(child => {
              const isChildSelected = selectedKey === child.key
              const isChildDisabled = child.disabled || false
              
              return (
                <li key={child.key}>
                  <div
                    role="button"
                    tabIndex={isChildDisabled ? -1 : 0}
                    aria-selected={isChildSelected}
                    aria-disabled={isChildDisabled}
                    aria-label={`${child.label}${isChildSelected ? ', selected' : ''}`}
                    style={{
                      ...styles.baseItem,
                      ...(isChildDisabled ? styles.disabledItem : {}),
                      borderRadius: "0.375rem",
                      backgroundColor: isChildSelected ? styles.selectedItem.backgroundColor : "transparent",
                      fontWeight: isChildSelected ? "600" : "400",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                    onClick={() => !isChildDisabled && onClickItem(child.key)}
                    onKeyDown={(e) => handleKeyDown(e, () => onClickItem(child.key))}
                    onMouseEnter={e => {
                      if (!isChildDisabled && !isChildSelected) {
                        e.currentTarget.style.backgroundColor = styles.hoverItem.backgroundColor
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isChildDisabled && !isChildSelected) {
                        e.currentTarget.style.backgroundColor = "transparent"
                      }
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {child.icon && <span style={{ marginRight: 8 }}>{child.icon}</span>}
                      {child.label}
                    </div>
                    {child.badge && <span style={styles.badge}>{child.badge}</span>}
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    )
  }

  // Render a selectable single item
  return (
    <div
      role="button"
      tabIndex={isDisabled ? -1 : 0}
      aria-selected={isSelected}
      aria-disabled={isDisabled}
      aria-label={`${item.label}${isSelected ? ', selected' : ''}`}
      style={{
        ...styles.baseItem,
        ...(isDisabled ? styles.disabledItem : {}),
        fontWeight: isSelected ? "500" : "400",
        backgroundColor: isSelected ? styles.selectedItem.backgroundColor : "transparent",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      onClick={() => !isDisabled && onClickItem(item.key)}
      onKeyDown={(e) => handleKeyDown(e, () => onClickItem(item.key))}
      onMouseEnter={e => {
        if (!isDisabled && !isSelected) {
          e.currentTarget.style.backgroundColor = styles.hoverItem.backgroundColor
        }
      }}
      onMouseLeave={e => {
        if (!isDisabled && !isSelected) {
          e.currentTarget.style.backgroundColor = "transparent"
        }
      }}
    >
      <div style={{ display: "flex", alignItems: "center" }}>
        {item.icon && <span style={{ marginRight: 8 }}>{item.icon}</span>}
        {item.label}
      </div>
      {item.badge && <span style={styles.badge}>{item.badge}</span>}
    </div>
  )
})

// Add display name for debugging
AccordionItem.displayName = 'AccordionItem'

// Main component with performance optimizations
const SidebarAccordionMenu: React.FC<ComponentProps> = ({ args }) => {
  // Memoize menu structure to prevent unnecessary re-renders
  const menu = useMemo<MenuItem[]>(() => args.menu_structure || [], [args.menu_structure])
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  // Resize iframe on mount and menu changes
  useEffect(() => {
    Streamlit.setFrameHeight()
  }, [menu])

  return (
    <nav 
      role="navigation"
      aria-label="Sidebar navigation menu"
      style={styles.container}
    >
      {menu.map(item => (
        <AccordionItem
          key={item.key}
          item={item}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
      ))}
    </nav>
  )
}

// Export with Streamlit connection
export default withStreamlitConnection(SidebarAccordionMenu)