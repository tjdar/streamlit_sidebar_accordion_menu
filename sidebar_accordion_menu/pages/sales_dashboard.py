import streamlit as st
from sidebar_accordion_menu import sidebar_accordion_menu

# Use the same menu structure (dict format)
menu = {
    "🏠 Home": None,
    "📊 Analytics": {
        "Sales Dashboard": "sales_dashboard",
        "User Analytics": "user_analytics",
    },
    "⚙️ Settings": {
        "General": "general_settings",
        "Advanced": "advanced_settings",
    }
}

sidebar_accordion_menu(menu)

# Page content
st.title("Sales Dashboard")
st.write("Overview of your sales performance and key metrics.")

# Key metrics
col1, col2, col3 = st.columns(3)
col1.metric("Total Sales", "$10,234", "+12%")
col2.metric("Active Customers", "1,234", "+8%")
col3.metric("Conversion Rate", "4.5%", "+0.3%")

# Sales trend chart
st.subheader("Monthly Sales Trend")
sales_data = {
    "Month": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "Sales": [1500, 1800, 1700, 2100, 2300, 2500]
}
st.line_chart(data=sales_data, x="Month", y="Sales")

# Top products table
st.subheader("Top Selling Products")
st.table({
    "Product": ["Product A", "Product B", "Product C"],
    "Units Sold": [320, 280, 150],
    "Revenue": ["$3,200", "$2,800", "$1,500"]
})