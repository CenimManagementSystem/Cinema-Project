# UI Animations and Routing Guidelines

This document outlines the guidelines and implementation details for UI animations and routing structures added to the project.

## 1. UI Animations (Motion for React)

We use `motion/react` (Motion) to power our UI animations, focusing on subtle, professional transitions that enhance the user experience without being overwhelming.

### Key Principles
- **Subtlety:** Animations should be quick and natural (e.g., `easeOut` easing, duration `0.2s` - `0.4s`).
- **Performance:** Animate transforms and opacities (e.g., `y`, `opacity`) instead of layout-affecting properties when possible.
- **Accessibility:** Respect user preferences by supporting `useReducedMotion`. Keep critical content accessible regardless of animation states.

### Common Patterns

1. **Page Transitions:**
   We wrap main content areas (e.g., inside `Mainlayout`) with `motion.div` to orchestrate smooth page entry and exit animations.

2. **Component Entrance:**
   Cards and content sections use staggered entrance animations (fading in and sliding slightly upward) to guide the user's eye.

3. **Modals & Dialogs:**
   Modals utilize spring physics for scale and opacity, ensuring they pop in organically while maintaining a professional feel.

4. **Interactive Elements:**
   Buttons and interactive cards feature hover (`whileHover`) and tap (`whileTap`) states to provide immediate tactile feedback.

### Usage Example
```tsx
import { motion } from 'motion/react';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { ease: 'easeOut' as const, duration: 0.3 }
  },
};

<motion.div
  initial="hidden"
  animate="visible"
  variants={cardVariants}
>
  Content
</motion.div>
```

---

## 2. Advanced Routing

The application utilizes `react-router-dom` to manage modular routing across public, authenticated, and administrative contexts.

### Wildcard and 404 Pages
- **Global 404 Catch-All:** A `*` wildcard route is registered at the end of our route configurations to catch any unrecognized URL paths.
- **`NotFoundPage` Component:** Unmatched routes gracefully fallback to the `NotFoundPage`, which maintains the site's layout structure (navbar and footer) while presenting a user-friendly error state and a call-to-action to return home.

### Admin Route Prefixing
- All administrative routes are strictly prefixed with `/admin` to isolate them logically and prevent routing collisions with public views.
- **Legacy Support:** If users attempt to visit legacy admin paths (e.g., `/en/admin/*` or `/en/dashboard`), they are automatically redirected to their correct `/admin/...` counterparts using `Navigate` and `replace`.
