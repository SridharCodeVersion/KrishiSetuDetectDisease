# KRISHI-SETU Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from agricultural technology platforms like Climate FieldView and agricultural dashboards, combined with accessibility-first design principles for rural users.

## Core Design Elements

### A. Color Palette
**Primary Colors (Dark/Light Mode)**
- Primary: 142 69% 58% / 142 45% 35% (Agricultural green)
- Secondary: 45 85% 47% / 45 60% 25% (Harvest gold)
- Background: 0 0% 9% / 0 0% 98%
- Surface: 0 0% 15% / 0 0% 95%
- Text: 0 0% 95% / 0 0% 15%

**Accent Colors**
- Success: 120 60% 50% (Healthy crop green)
- Warning: 38 92% 50% (Disease alert orange)
- Error: 0 75% 60% (Critical red)

### B. Typography
- **Primary**: Inter (Google Fonts) - Clean, readable for dashboards
- **Display**: Poppins (Google Fonts) - Friendly headers
- **Regional**: Noto Sans (Google Fonts) - Multi-language support
- Scale: text-sm (14px), text-base (16px), text-lg (18px), text-xl (20px), text-2xl (24px)

### C. Layout System
**Spacing Units**: Tailwind units of 2, 4, 6, 8, 12, 16
- Cards: p-6, gap-4
- Sections: py-12, px-4
- Components: m-2, p-4

### D. Component Library

**Navigation**
- Fixed header with KRISHI-SETU logo
- Horizontal navigation with icons (Heroicons)
- Mobile hamburger menu
- Language switcher dropdown

**Dashboard Cards**
- Large interactive cards (min-h-32) with rounded-xl corners
- Disease Detection card with camera icon and upload area
- Weather Insights card with current conditions
- Crop Health Monitoring with progress indicators
- Recent Activity timeline

**AI Chatbot Interface**
- Fixed bottom-right position
- Expandable chat window (rounded-t-2xl)
- Voice input button with visual feedback
- Message bubbles with proper spacing
- Text-to-speech controls

**Forms & Inputs**
- Large touch-friendly buttons (min-h-12)
- High contrast form fields
- File upload with drag-and-drop
- Voice input integration

**Data Visualization**
- Simple charts using Chart.js
- Color-coded health indicators
- Progress bars for crop development
- Weather forecast cards

### E. Key Features Design

**Disease Detection Flow**
- Prominent upload button on dashboard
- Camera capture interface
- AI analysis loading state with progress
- Results display with disease images and treatment cards

**Multilingual Support**
- Language selector in header
- Regional fonts for Hindi, Tamil, Telugu, Bengali, etc.
- RTL layout support where needed

**Accessibility Features**
- Large button sizes (min-h-12, min-w-24)
- High contrast ratios (4.5:1 minimum)
- Voice navigation support
- Simple iconography with text labels

## Images
- **Hero Image**: Large agricultural landscape (farmers in fields) for landing page
- **Dashboard Icons**: Crop, weather, disease detection symbols
- **Disease Gallery**: Reference images for common crop diseases
- **Tutorial Images**: Step-by-step visual guides
- **Profile Placeholders**: Farmer and expert avatars

## Animation Guidelines
- Minimal, purposeful animations only
- Fade transitions for card interactions
- Loading spinners for AI processing
- Smooth chat bubble appearances
- No decorative animations that may distract

## Mobile Responsiveness
- Touch-first design approach
- Cards stack vertically on mobile
- Sticky chatbot button
- Simplified navigation drawer
- Large tap targets (44px minimum)