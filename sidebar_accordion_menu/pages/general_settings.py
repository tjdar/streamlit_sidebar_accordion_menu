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
st.title("General Settings")
st.write("Configure the general settings for your application below.")

st.subheader("Theme")
theme = st.selectbox("Choose your theme", ["Light", "Dark", "System Default"])

st.subheader("Notifications")
email_notify = st.checkbox("Enable email notifications", value=True)
push_notify = st.checkbox("Enable push notifications", value=False)

st.subheader("Language")
language = st.radio("Display language", ["English", "Japanese"])

if st.button("Save Settings"):
    st.success("Settings have been saved successfully!")