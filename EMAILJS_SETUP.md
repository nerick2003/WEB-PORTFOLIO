# EmailJS Setup Guide

## Overview
Your contact form is now integrated with EmailJS, but you need to configure it with your credentials to enable email sending.

## Step-by-Step Setup

### 1. Create an EmailJS Account
1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account (allows 200 emails/month)

### 2. Add an Email Service
1. In your EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions
5. **Copy your Service ID** (you'll need this)

### 3. Create an Email Template
1. Go to **Email Templates** in your dashboard
2. Click **Create New Template**
3. Use the following template variables:
   - `{{from_name}}` - Sender's name
   - `{{from_email}}` - Sender's email
   - `{{subject}}` - Email subject
   - `{{message}}` - Message content
   - `{{to_email}}` - Your email (recipient)

4. Example template:
   ```
   Subject: Portfolio Contact: {{subject}}
   
   From: {{from_name}} ({{from_email}})
   
   Message:
   {{message}}
   ```

5. **Copy your Template ID**

### 4. Get Your Public Key
1. Go to **Account** → **General**
2. Find your **Public Key**
3. Copy it

### 5. Update Your Configuration
Open `script.js` and find the `EMAILJS_CONFIG` object (around line 1079):

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'YOUR_SERVICE_ID',      // Replace with your Service ID
    templateId: 'YOUR_TEMPLATE_ID',    // Replace with your Template ID
    publicKey: 'YOUR_PUBLIC_KEY'       // Replace with your Public Key
};
```

Replace the placeholder values with your actual credentials.

### 6. Test the Form
1. Open your portfolio in a browser
2. Fill out the contact form
3. Submit and check your email inbox

## Fallback Behavior
If EmailJS is not configured, the form will still show a success message (but won't actually send emails). This allows you to test the form UI while setting up EmailJS.

## Troubleshooting
- **Form not sending**: Check browser console for errors
- **Email not received**: Verify your EmailJS service is connected
- **Template errors**: Ensure all template variables match exactly

## Alternative: Use Formspree
If you prefer not to use EmailJS, you can use Formspree instead:
1. Go to [https://formspree.io/](https://formspree.io/)
2. Create a free account
3. Get your form endpoint
4. Update the form action in `components/contact.html`

