# VAE Systems Design System Documentation

> **Comprehensive guide to VAE's design system, CSS variables, and component styling**

## 🎨 Color System

### Primary Brand Colors
- **VAE Turquoise**: Our signature color used for primary actions, highlights, and brand elements
  - `vae-turquoise` / `vae-turquoise-500`: `hsl(157, 100%, 47%)` - #00ffa5 (Main brand color)
  - `vae-turquoise-light` / `vae-turquoise-300`: `hsl(157, 100%, 60%)` - Light variant
  - `vae-turquoise-dark` / `vae-turquoise-700`: `hsl(157, 100%, 35%)` - Dark variant

### Background Colors
- `bg-darker`: `hsl(0, 0%, 4%)` - Darkest background, main page background
- `bg-dark`: `hsl(0, 0%, 8%)` - Standard dark background for sections
- `bg-secondary`: `hsl(0, 0%, 12%)` - Lighter background for cards and elements

### Text Colors
- `text-light`: `hsl(0, 0%, 95%)` - Primary text color
- `text-secondary`: `hsla(0, 0%, 100%, 0.7)` - Secondary text with transparency
- `text-muted`: `hsla(0, 0%, 80%, 0.8)` - Muted text for less important content

## 🧩 Component Classes

### Buttons

#### Primary Button (.btn-primary)
**Usage**: Main call-to-action buttons
```tsx
<button className="btn-primary">Kostenlose KI-Beratung</button>
```
**Styles**: 
- Background: `bg-vae-turquoise`
- Text: `text-vae-black`
- Hover: `hover:bg-vae-turquoise-400`
- Focus ring with turquoise accent

#### Secondary Button (.btn-secondary)
**Usage**: Secondary actions, outlined style
```tsx
<button className="btn-secondary">VAEKTRA CORE Demo</button>
```
**Styles**:
- Border: `border-vae-turquoise`
- Text: `text-vae-turquoise`
- Hover: `hover:bg-vae-turquoise hover:text-vae-black`

#### Ghost Button (.btn-ghost)
**Usage**: Subtle actions, minimal styling
```tsx
<button className="btn-ghost">Learn More</button>
```

### Cards

#### VAE Card (.card-vae)
**Usage**: Standard card component with hover effects
```tsx
<div className="card-vae">Content here</div>
```
**Features**:
- Glassmorphism background
- Hover glow effect
- Border transition on hover

### Text Styles

#### Gradient Text (.text-gradient)
**Usage**: Highlighted text with brand gradient
```tsx
<h1 className="text-gradient">Lokale KI-Infrastruktur</h1>
```

### Navigation

#### Navigation Links (.nav-link)
**Usage**: Navigation menu items
```tsx
<a href="#services" className="nav-link">Services</a>
<a href="#about" className="nav-link active">About</a>
```

## 📐 Layout System

### Container (.container-vae)
**Usage**: Main content container with responsive padding
```tsx
<div className="container-vae">Content with max-width and padding</div>
```
**Breakpoints**:
- sm: 640px
- md: 768px  
- lg: 1024px
- xl: 1200px

## ✨ Effects & Utilities

### Glow Effects
- `.glow-turquoise`: Standard glow effect
- `.glow-turquoise-strong`: Stronger glow effect

### Backdrop Effects
- `.backdrop-glass`: Glassmorphism backdrop with blur

### Custom Scrollbar
- `.scrollbar-custom`: VAE-branded scrollbar styling

## 🎭 Animation System

### Predefined Animations
- `animate-fade-in`: Fade in effect
- `animate-slide-up`: Slide up from bottom
- `animate-glow`: Pulsing glow effect

### Motion Guidelines
- **Standard duration**: 300ms for most interactions
- **Hover effects**: `-translate-y-1` for lift effect
- **Scale animations**: `scale-110` for emphasis

## 🎯 Usage Examples

### Service Card Component
```tsx
<div className="bg-gradient-to-br from-white/8 to-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/15 hover:border-vae-turquoise/30 transition-all duration-300">
  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-vae-turquoise to-vae-turquoise-dark flex items-center justify-center text-white">
    {icon}
  </div>
  <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
  <p className="text-gray-300 mb-6">{description}</p>
  <button className="btn-primary w-full">{cta}</button>
</div>
```

### Section Header
```tsx
<div className="text-center mb-16">
  <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-vae-turquoise to-vae-turquoise bg-clip-text text-transparent">
    Section Title
  </h2>
  <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
    Section description
  </p>
</div>
```

## 🔧 CSS Variables Reference

### Global CSS Variables (globals.css)
```css
:root {
  /* Colors */
  --color-vae-turquoise: 157 100% 47%;
  --color-vae-turquoise-rgb: 0, 255, 165;
  
  /* Typography */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  /* ... more sizes */
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  /* ... more spacing */
  
  /* Effects */
  --shadow-glow: 0 0 20px hsla(var(--color-vae-turquoise), 0.3);
  --shadow-glow-strong: 0 0 30px hsla(var(--color-vae-turquoise), 0.5);
  
  /* Z-Index Scale */
  --z-dropdown: 1000;
  --z-sticky: 1020;
  --z-fixed: 1030;
  --z-modal-backdrop: 1040;
  --z-modal: 1050;
  --z-popover: 1060;
  --z-tooltip: 1070;
}
```

## 📱 Responsive Design

### Breakpoint Usage
- **Mobile First**: Start with mobile styles, add breakpoints for larger screens
- **Breakpoint Classes**: `sm:`, `md:`, `lg:`, `xl:`
- **Grid System**: Use CSS Grid with responsive columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`

### Typography Scaling
```tsx
className="text-4xl md:text-5xl lg:text-6xl"
```

## ♿ Accessibility

### Focus States
All interactive elements include focus rings:
```css
focus:outline-none focus:ring-2 focus:ring-vae-turquoise focus:ring-offset-2 focus:ring-offset-bg-darker
```

### Reduced Motion
Respects user preferences:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🚀 Best Practices

### 1. Component Consistency
- Always use defined button classes instead of custom styling
- Use consistent spacing with Tailwind classes
- Follow the established color hierarchy

### 2. Performance
- Use Tailwind's purge feature to remove unused CSS
- Prefer CSS custom properties for dynamic values
- Use backdrop-filter for glassmorphism effects

### 3. Maintainability
- Document any custom CSS additions
- Use semantic class names
- Keep animations subtle and purposeful

## 🔄 Updates & Changes

When updating the design system:

1. **Update Tailwind Config**: Modify `tailwind.config.js` for new colors/utilities
2. **Update Global CSS**: Add new component classes to `globals.css`
3. **Update Documentation**: Keep this file current with all changes
4. **Test Components**: Verify all existing components still work
5. **Commit Changes**: Use descriptive commit messages for design updates

---

*Last updated: August 2025 | VAE Systems Design Team*
