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
st.title("User Analytics")
st.write("Analyze your user base and engagement trends.")

# Key metrics
col1, col2, col3 = st.columns(3)
col1.metric("Active Users", "1,234", "+5%")
col2.metric("New Signups", "320", "+12%")
col3.metric("Churn Rate", "2.1%", "-0.4%")

# User growth chart
st.subheader("Monthly Active Users")
user_data = {
    "Month": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "Active Users": [900, 1050, 1100, 1200, 1234, 1300]
}
st.line_chart(data=user_data, x="Month", y="Active Users")

# User demographics table
st.subheader("User Demographics")
st.table({
    "Age Group": ["18-24", "25-34", "35-44", "45+"],
    "Users": [300, 500, 300, 134]
})