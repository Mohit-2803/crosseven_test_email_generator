# Crosseven Email Generator

A modern, responsive web application for generating test emails in the format `[name]+[random-number]@crosseven.com` for the Crosseven team.

## Features

- 🎯 **Simple Interface**: Clean, modern design with intuitive user experience
- 📧 **Email Generation**: Generates emails in the format `name+12345@crosseven.com`
- 📋 **One-Click Copy**: Copy generated emails to clipboard instantly
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- ⚡ **Fast & Lightweight**: No dependencies, pure HTML/CSS/JavaScript
- 🎨 **Modern UI**: Gradient backgrounds, smooth animations, and professional styling
- ♿ **Accessible**: Keyboard navigation and screen reader friendly
- 💾 **Form Persistence**: Remembers your last entered name

## Usage

1. Enter a name in the input field (letters, numbers, dots, hyphens, underscores)
2. Click "Generate Email" or press Enter
3. Copy the generated email to your clipboard with one click
4. Use the email for testing purposes

### Email Format

```
[name]+[5-digit-random-number]@crosseven.com
```

**Examples:**

- `john.doe+12345@crosseven.com`
- `testuser+67890@crosseven.com`
- `jane_smith+54321@crosseven.com`

## Keyboard Shortcuts

- **Enter**: Generate email
- **Ctrl/Cmd + Enter**: Generate email (alternative)
- **Ctrl/Cmd + C**: Copy email (when email is displayed)

## Local Development

1. Clone this repository
2. Open `index.html` in your browser or serve it locally:

```bash
# Using Node.js serve package
npm install
npm run dev

# Using Python
python -m http.server 3000

# Using PHP
php -S localhost:3000
```

## Deployment to Vercel

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Deploy with default settings (no build configuration needed)

### Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/crosseven-email-generator)

## File Structure

```
crosseven-email-generator/
├── index.html          # Main HTML file
├── style.css          # Styles and responsive design
├── script.js          # JavaScript functionality
├── package.json       # Project metadata
└── README.md          # Documentation
```

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## Features in Detail

### Input Validation

- Minimum 2 characters
- Only allows letters, numbers, dots, hyphens, and underscores
- Real-time validation with helpful error messages

### Clipboard Support

- Modern `navigator.clipboard` API with fallback
- Visual feedback on successful copy
- Cross-browser compatibility

### Responsive Design

- Mobile-first approach
- Smooth animations and transitions
- Touch-friendly interface
- Dark mode support (system preference)

### Accessibility

- Semantic HTML structure
- ARIA labels and roles
- Keyboard navigation
- Screen reader friendly
- High contrast support

## Customization

### Changing Email Domain

To change from `@crosseven.com` to another domain, edit the `generateEmail` function in `script.js`:

```javascript
return `${cleanName}+${randomNumber}@yourdomain.com`;
```

### Styling

Customize colors and appearance by modifying CSS custom properties in `style.css`:

```css
:root {
  --primary-color: #2563eb;
  --success-color: #059669;
  /* ... other variables */
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for your team or projects.

## Support

For issues or questions, please contact the Crosseven development team or create an issue in the repository.

---

Built with ❤️ for the Crosseven team
