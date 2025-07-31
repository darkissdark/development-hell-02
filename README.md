# Booksy - Modern Bookstore Website

A modern, responsive bookstore website built with vanilla JavaScript and
optimized for performance. Features a comprehensive book catalog, user reviews,
events, and interactive shopping experience.

## 🚀 Features

### Core Functionality

- **Book Catalog**: Browse books by categories with filtering and search
- **Shopping Cart**: Add books to cart with quantity management
- **User Reviews**: Customer feedback system with ratings
- **Events Section**: Book club events and author meetups
- **Location Information**: Store details and contact information
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Performance Optimizations

- **Critical CSS**: Injected as `<style>` tag for instant rendering
- **Async CSS Loading**: Non-blocking CSS loading with fallback
- **Image Optimization**: WebP format with fallback JPG, responsive images
- **Lazy Loading**: Images load as needed for better performance
- **Smooth Scrolling**: Enhanced navigation experience
- **Sticky Header**: Smart header that hides/shows based on scroll direction

### User Experience

- **Interactive Modals**: Book details, cart, and contact forms
- **Smooth Animations**: CSS transitions and Intersection Observer animations
- **Mobile-First Design**: Touch-friendly interface
- **Accessibility**: ARIA labels, semantic HTML, keyboard navigation

## 📦 Installation

```bash
npm install
```

## 🛠 Development

```bash
npm run dev
```

The site will be available at: http://localhost:5173/

## 🏗 Build

```bash
npm run build
```

Generated files will be in the `dist/` folder.

## 🌐 Deployment

### GitHub Pages

1. Upload the contents of the `dist/` folder to your repository
2. Configure GitHub Pages to use the files folder

## 📁 Project Structure

```
src/
├── css/
│   ├── base/           # Base styles (buttons, forms, containers)
│   ├── sections/       # Section-specific styles
│   ├── modals/         # Modal styles
│   ├── critical.css    # Critical CSS (injected inline)
│   └── index.css       # Main CSS (loaded asynchronously)
├── js/
│   ├── books.js        # Book catalog functionality
│   ├── cart.js         # Shopping cart logic
│   ├── header.js       # Navigation and scroll behavior
│   ├── feedbacks.js    # Reviews system
│   ├── events.js       # Events functionality
│   ├── location.js     # Location animations
│   └── modals/         # Modal interactions
├── partials/
│   ├── hero.html       # Hero slider section
│   ├── books.html      # Book catalog section
│   ├── feedbacks.html  # Reviews section
│   ├── events.html     # Events section
│   ├── location.html   # Location section
│   ├── modals/         # Modal templates
│   └── common/         # Shared components
├── images/             # Optimized images (WebP + JPG)
└── fonts/              # Custom fonts (Rubik)
```

## 🔧 Technologies

### Core

- **Vanilla JavaScript** - No frameworks, pure JS for performance
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern CSS with custom properties and animations

### Build Tools

- **Vite** - Fast build tool and dev server
- **PostCSS** - CSS processing with plugins
- **CSSnano** - CSS minification
- **Terser** - JavaScript minification

### Libraries

- **Swiper** - Touch slider for hero section
- **Axios** - HTTP client for API requests
- **Izitoast** - Toast notifications
- **Rater.js** - Star rating component
- **Accordion.js** - Collapsible content

### Performance

- **Critical CSS Injection** - Above-the-fold styles inline
- **Async CSS Loading** - Non-blocking stylesheet loading
- **Image Optimization** - WebP format with responsive images
- **Code Splitting** - Vendor chunks for better caching

## 📊 Performance Features

### Loading Optimization

- **Critical CSS**: Injected inline for instant rendering
- **Async CSS**: Loaded with `media="print"` and `onload` switch
- **Image Preloading**: Hero images preloaded for faster display
- **Lazy Loading**: Images load as they enter viewport

### Rendering Performance

- **Smooth Scrolling**: Hardware-accelerated scroll behavior
- **Intersection Observer**: Efficient scroll-based animations
- **CSS Transitions**: Hardware-accelerated animations
- **Mobile Safari Fixes**: Proper touch handling and color management

### Build Optimization

- **CSS Minification**: Reduced file sizes
- **JavaScript Minification**: Optimized bundle sizes
- **Asset Hashing**: Cache busting for production
- **Source Maps**: Debugging support in development

## 🎨 Design System

### Colors

- **Primary**: #b84700 (Orange)
- **Secondary**: #0b0500 (Dark Brown)
- **Background**: #fceee6 (Light Cream)
- **Text**: #0b0500 (Dark Brown)

### Typography

- **Font Family**: Rubik (Google Fonts)
- **Weights**: 400, 500, 600
- **Responsive**: Mobile-first approach

### Components

- **Buttons**: Primary, secondary, and navigation variants
- **Cards**: Book cards with hover effects
- **Modals**: Overlay dialogs for interactions
- **Forms**: Styled input fields and validation

## 📱 Responsive Design

### Breakpoints

- **Mobile**: Up to 767px
- **Tablet**: 768px - 1439px
- **Desktop**: 1440px and above

### Features

- **Mobile-First**: Base styles for mobile, enhanced for larger screens
- **Touch-Friendly**: Proper touch targets and interactions
- **Flexible Images**: Responsive images with multiple formats
- **Adaptive Layout**: Grid and flexbox for flexible layouts

## 🔍 SEO & Accessibility

### SEO Features

- **Semantic HTML**: Proper heading hierarchy and structure
- **Meta Tags**: Open Graph tags for social sharing
- **Alt Text**: Descriptive alt attributes for images
- **Structured Data**: Book and review markup

### Accessibility

- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Focus Management**: Proper focus indicators
- **Color Contrast**: WCAG compliant color ratios

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone [repository-url]
   cd development-hell-02
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
