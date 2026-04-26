# Scroll Effects Implementation

This document describes the scroll effects implemented in the portfolio.

## ✨ Features Implemented

### 1. **Smooth Scroll Behavior**
- **Location**: `src/index.css`
- **Implementation**: Native CSS `scroll-behavior: smooth` on the `html` element
- **Effect**: Navigation links smoothly scroll to their target sections
- **Accessibility**: Respects `prefers-reduced-motion` user preference
- **Scroll Offset**: Added `scroll-margin-top: 100px` to sections to account for header

### 2. **Parallax Scroll Effect**
- **Location**: `src/components/Hero.jsx`
- **Technology**: Framer Motion's `useScroll` and `useTransform` hooks
- **Effect**: 
  - Text content moves down slower (150px over 500px scroll)
  - Profile image moves up slightly (-100px over 500px scroll)
  - Both elements fade out as you scroll (opacity transitions)
  - Creates depth perception with different scroll speeds
- **Enhancement**: Added hover scale effect to profile image

### 3. **Animated Section Reveals**
- **Custom Hook**: `src/hooks/useScrollAnimation.js`
- **Technology**: Intersection Observer API + Framer Motion
- **Components Enhanced**:
  - **Education**: Staggered fade-in/slide-up with 0.15s delay between cards
  - **Internships**: Staggered fade-in/slide-up with 0.2s delay between items
  - **Skills**: Scale-in animation with 0.05s stagger, plus playful rotation on hover
  - **Projects**: Staggered fade-in/slide-up with 0.1s delay between cards
  - **Contact**: Coordinated animations for heading, content, and action buttons

## 🎯 Animation Patterns

### Fade-in/Slide-up Pattern
```javascript
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}
```

### Stagger Children Pattern
```javascript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15  // Delay between each child animation
    }
  }
}
```

## ⚙️ Configuration Options

### useScrollAnimation Hook Options
```javascript
const [ref, inView] = useScrollAnimation({
  threshold: 0.2,      // Percentage of element visible to trigger
  triggerOnce: true,   // Animate only once when entering view
  rootMargin: '0px'    // Margin around viewport for early/late triggering
})
```

## 🎨 Visual Enhancements

1. **Smooth transitions**: All animations use `ease-out` timing for natural feel
2. **Staggered timing**: Children animate sequentially, not all at once
3. **Hover interactions**: Enhanced with scale, rotation, and elevation effects
4. **Performance**: Hardware-accelerated transforms (translate, scale)
5. **Accessibility**: Respects `prefers-reduced-motion` media query

## 🚀 Performance Optimizations

- **Intersection Observer**: Efficient viewport detection (no scroll listeners)
- **GPU Acceleration**: Using CSS transforms instead of top/left positioning
- **Trigger Once**: Most animations only run once to reduce recalculation
- **Threshold Control**: Animations trigger when sections are sufficiently visible

## 📱 Responsive Behavior

- All scroll effects work seamlessly on mobile and desktop
- Touch interactions preserved
- Reduced motion support for accessibility
- Adaptive animation intensity based on user preferences

## 🔧 How to Customize

### Change Parallax Speed
Edit `useTransform` ranges in `Hero.jsx`:
```javascript
const yText = useTransform(scrollY, [0, 500], [0, 150])  // [scrollRange], [movementRange]
```

### Adjust Stagger Timing
Modify `staggerChildren` in component variant definitions:
```javascript
staggerChildren: 0.15  // Seconds between each child animation
```

### Change Trigger Point
Adjust `threshold` in `useScrollAnimation` hook:
```javascript
threshold: 0.2  // 0.0 = top of element, 1.0 = fully visible
```

## 📦 Dependencies

- `framer-motion`: ^10.12.16 - For scroll and reveal animations
- Native `Intersection Observer API` - For viewport detection
- Native CSS `scroll-behavior` - For smooth scrolling

## 🌐 Browser Support

- Smooth scroll: All modern browsers (fallback to instant scroll in older browsers)
- Intersection Observer: All modern browsers (can add polyfill if needed)
- Framer Motion: Full support in all major browsers

---

**Note**: All animations respect user preferences for reduced motion, ensuring an accessible experience for all users.
