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
st.title("Advanced Settings")
st.write("Configure advanced options for your application below.")

st.subheader("API Configuration")
api_key = st.text_input("API Key", type="password")
endpoint = st.text_input("API Endpoint", value="https://api.example.com")

st.subheader("Performance")
cache_enabled = st.checkbox("Enable caching", value=True)
max_threads = st.slider("Max worker threads", min_value=1, max_value=16, value=4)

st.subheader("Debugging")
debug_mode = st.toggle("Enable debug mode", value=False)
log_level = st.selectbox("Log level", ["INFO", "DEBUG", "WARNING", "ERROR"])

if st.button("Save Advanced Settings"):
    st.success("Advanced settings saved successfully!")