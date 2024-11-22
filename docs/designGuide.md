# Supplement App Design System

A comprehensive guide for maintaining consistent, accessible, and user-friendly design across the supplement management application.

## Design Philosophy

Our design system prioritizes clarity, efficiency, and trust. Supplement management requires precise information display and careful user input handling. The interface should:

- Make complex supplement information easily scannable
- Prevent user errors in data entry
- Build trust through professional, consistent presentation
- Maintain accessibility for all users
- Support efficient workflows for power users

## Color Palette

### Primary Colors

Our color choices reflect both functionality and brand personality:

```jsx
<!-- Primary Action Blue -->
<button class="bg-blue-500 hover:bg-blue-600">
  Calculate Combinations
</button>

<!-- Success Green -->
<div class="bg-green-500 hover:bg-green-600">
  Supplement Added
</div>

<!-- Error Red -->
<div class="bg-red-500 hover:bg-red-600">
  Invalid Combination
</div>
```

**Design Rationale:**

- Blue (`blue-500`) as primary color: Conveys trust and stability, essential for a health-related application
- Green (`green-500`) for success: Universal positive confirmation color, high recognition value
- Red (`red-500`) for errors/destructive actions: Creates clear visual hierarchy for important warnings

### Neutral Colors

```jsx
<!-- Main Content Area -->
<div class="bg-gray-50">
  <!-- Card Component -->
  <div class="bg-white border-gray-200">
    <p class="text-gray-900">Primary Content</p>
    <p class="text-gray-500">Supporting Information</p>
    <span class="text-gray-400">Inactive State</span>
  </div>
</div>
```

**Design Rationale:**

- Light gray background (`gray-50`): Reduces eye strain during extended use while maintaining sufficient contrast
- White components (`white`): Creates clear visual hierarchy and separation between elements
- Text color hierarchy:
  - `gray-900`: Primary text - optimal readability
  - `gray-500`: Secondary text - clear visual hierarchy without losing legibility
  - `gray-400`: Disabled states - obvious visual distinction for inactive elements

## Typography

### Type Scale

```jsx
<!-- Main Page Title -->
<h1 class="text-2xl font-bold tracking-tight">
  Supplement Calculator
</h1>

<!-- Section Headers -->
<h2 class="text-xl font-semibold tracking-normal">
  Active Combinations
</h2>

<!-- Component Headers -->
<h3 class="text-lg font-medium">
  Ingredient List
</h3>

<!-- Body Copy -->
<p class="text-base leading-relaxed">
  Primary content text
</p>

<!-- Supporting Text -->
<p class="text-sm text-gray-500">
  Additional details
</p>
```

**Design Rationale:**

- Limited type scale (sm to 2xl): Maintains consistency while providing sufficient hierarchy
- Increased line height (`leading-relaxed`): Improves readability for longer content
- Font weights map to hierarchy: Bold (700) for titles, semibold (600) for sections, medium (500) for subsections
- Tracking adjustments: Tighter for headlines, normal for body text

## Spacing System

### Base Unit

We use a 4px base unit (Tailwind's default) for all spacing to maintain visual rhythm:

```jsx
<!-- Component Spacing Example -->
<div class="space-y-4"> <!-- 16px vertical spacing -->
  <div class="p-6">     <!-- 24px padding -->
    <h2 class="mb-4">   <!-- 16px bottom margin -->
      Component Title
    </h2>
    <div class="space-y-2"> <!-- 8px vertical spacing -->
      Content
    </div>
  </div>
</div>
```

**Design Rationale:**

- 4px base unit: Creates consistent visual rhythm across the application
- Larger spacing (16px/24px) for component separation: Improves content grouping and readability
- Smaller spacing (8px) for related elements: Maintains visual connection while ensuring clarity

## Components

### Cards

Cards are a fundamental building block for displaying supplement information:

```jsx
<div class="bg-white rounded-lg shadow-lg hover:shadow-xl p-6 border border-gray-200 transition-shadow duration-300">
  <!-- Card Header -->
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-lg font-medium text-gray-900">
      Vitamin D3
    </h3>
    <span class="text-sm text-gray-500">
      5000 IU
    </span>
  </div>
  
  <!-- Card Content -->
  <div class="space-y-2">
    <p class="text-sm text-gray-500">
      Manufacturer: NOW Foods
    </p>
    <!-- Ingredient List -->
    <ul class="divide-y divide-gray-100">
      {ingredients}
    </ul>
  </div>
  
  <!-- Card Actions -->
  <div class="mt-4 pt-4 border-t border-gray-100 flex justify-end space-x-2">
    <button class="text-gray-400 hover:text-blue-500 transition-colors duration-200">
      <span class="sr-only">Edit</span>
      <FaEdit class="h-4 w-4" />
    </button>
  </div>
</div>
```

**Design Rationale:**

- Rounded corners (`rounded-lg`): Creates a friendly, modern appearance
- Subtle shadow (`shadow-lg`): Provides depth without overwhelming the interface
- Hover animation: Indicates interactivity and improves user feedback
- Border: Ensures card visibility on white backgrounds
- Internal spacing: Creates clear content hierarchy
- Action placement: Common pattern for secondary actions

### Forms

Forms are critical for data input accuracy:

```jsx
<form class="space-y-6">
  <!-- Form Group -->
  <div class="space-y-1">
    <label class="text-sm font-medium text-gray-700" for="supplement-name">
      Supplement Name
    </label>
    <input 
      type="text"
      id="supplement-name"
      name="supplement-name"
      class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      placeholder="Enter supplement name"
    />
    <p class="text-sm text-gray-500">
      Enter the exact name as it appears on the label
    </p>
  </div>

  <!-- Numeric Input -->
  <div class="space-y-1">
    <label class="text-sm font-medium text-gray-700" for="dosage">
      Dosage (mg)
    </label>
    <div class="relative rounded-md shadow-sm">
      <input
        type="number"
        id="dosage"
        name="dosage"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder="0.00"
      />
      <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
        <span class="text-gray-500 sm:text-sm">mg</span>
      </div>
    </div>
  </div>
</form>
```

**Design Rationale:**

- Clear visual hierarchy: Labels above inputs for better scannability
- Consistent input styling: Familiar patterns for better usability
- Focus states: Clear visual feedback for keyboard navigation
- Helper text: Provides context without cluttering the interface
- Unit displays: Integrated into the input for clear context
- Proper spacing: Groups related fields while separating distinct sections

### Buttons

Our button system follows a clear hierarchy:

```jsx
<!-- Primary Action -->
<button class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
  Calculate
</button>

<!-- Secondary Action -->
<button class="bg-white text-gray-700 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200">
  Save Draft
</button>

<!-- Destructive Action -->
<button class="bg-white text-red-500 px-4 py-2 rounded-md border border-red-300 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200">
  Delete
</button>

<!-- Disabled State -->
<button class="bg-gray-100 text-gray-400 px-4 py-2 rounded-md cursor-not-allowed" disabled>
  Processing...
</button>
```

**Design Rationale:**

- Clear visual hierarchy: Different styles for different action types
- Consistent padding: Comfortable touch targets for all devices
- Interactive feedback: Hover and focus states for better UX
- Disabled states: Clear visual indication when actions are unavailable
- Focus rings: Maintain accessibility while fitting visual style

### Tables

Tables display detailed supplement information:

```jsx
<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
  <table class="min-w-full divide-y divide-gray-200">
    <thead class="bg-gray-50">
      <tr>
        <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Component
        </th>
        <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
          Amount
        </th>
      </tr>
    </thead>
    <tbody class="bg-white divide-y divide-gray-200">
      <tr class="hover:bg-gray-50 transition-colors duration-150">
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          Vitamin D3
        </td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
          5000 IU
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Design Rationale:**

- Contained design: Shadow and border help define the table area
- Header styling: Subtle background and uppercase text improve scanning
- Row hover: Helps users track across wide tables
- Text alignment: Right-aligned numbers for easier comparison
- Whitespace management: Consistent padding and nowrap for better readability

## Layout Principles

### Grid System

```jsx
<!-- Responsive Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <!-- Grid Items -->
</div>

<!-- Mixed Width Grid -->
<div class="grid grid-cols-12 gap-6">
  <div class="col-span-12 md:col-span-8">
    <!-- Main Content -->
  </div>
  <div class="col-span-12 md:col-span-4">
    <!-- Sidebar -->
  </div>
</div>
```

**Design Rationale:**

- Responsive breakpoints: Optimizes layout for different screen sizes
- Consistent gaps: Maintains visual rhythm across layouts
- 12-column system: Provides flexibility for various layout needs
- Mobile-first approach: Ensures good experience on all devices

### Content Organization

```jsx
<!-- Content Section -->
<section class="space-y-6">
  <!-- Section Header -->
  <header class="flex items-center justify-between">
    <h2 class="text-xl font-semibold text-gray-900">Active Supplements</h2>
    <button class="btn-primary">Add New</button>
  </header>
  
  <!-- Content Area -->
  <div class="bg-white rounded-lg shadow">
    <!-- Content -->
  </div>
  
  <!-- Section Footer -->
  <footer class="flex justify-end space-x-4">
    <!-- Actions -->
  </footer>
</section>
```

**Design Rationale:**

- Clear hierarchy: Consistent header/content/footer pattern
- Action placement: Common locations for primary and secondary actions
- Whitespace: Appropriate spacing for content separation
- Visual containers: Clear boundaries for content sections

## Accessibility Guidelines

### Color Contrast

- All text must maintain minimum contrast ratios:
  - Regular text: 4.5:1
  - Large text: 3:1
  - UI components: 3:1

### Interactive Elements

```jsx
<!-- Accessible Button -->
<button 
  class="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
  aria-label="Calculate supplement combinations"
>
  <span class="sr-only">Calculate</span>
  <CalculatorIcon class="h-5 w-5" />
</button>
```

**Design Rationale:**

- Clear focus states: Essential for keyboard navigation
- Screen reader text: Provides context for icon-only buttons
- Semantic HTML: Uses appropriate elements for better accessibility
- Sufficient touch targets: Minimum 44px for touch interfaces

## Animation Guidelines

### Transitions

```jsx
<!-- Hover Transition -->
<div class="transform transition-all duration-200 hover:scale-105">
  Content
</div>

<!-- Height Animation -->
<div class="transition-height duration-300 ease-in-out">
  Expandable Content
</div>
```

**Design Rationale:**

- Short durations: Keeps interface feeling snappy
- Appropriate properties: Only animate relevant properties
- Consistent timing: Uses standard duration values
- Purpose-driven: Animations serve functional purposes

## Best Practices

### Component Organization

```jsx
<!-- Well-Organized Component -->
<div class="supplement-card">
  <!-- Header Group -->
  <div class="supplement-card__header">
    <!-- Header Content -->
  </div>
  
  <!-- Content Group -->
  <div class="supplement-card__content">
    <!-- Main Content -->
  </div>
  
  <!-- Action Group -->
  <div class="supplement-card__actions">
    <!-- Buttons/Controls -->
  </div>
</div>
```

**Design Rationale:**

- Logical grouping: Related elements stay together
- Clear structure: Consistent pattern across components
- Scalable organization: Easy to maintain and extend
- Predictable patterns: Reduces cognitive load for developers

Remember:

1. Always maintain consistency with these patterns
2. Document any deviations or special cases
3. Consider mobile users first in layout decisions
4. Test all interactive elements for accessibility
5. Validate color choices for contrast requirements

This guide should evolve as new patterns emerge and requirements change. Regular reviews and updates will help maintain design consistency across the application.

[Previous sections remain the same...]

## Form Patterns

### Form Layout Principles

Forms are crucial for data entry in our supplement management system. We follow these core principles:

```jsx
<!-- Single Column Form -->
<form class="max-w-2xl space-y-8">
  <!-- Logical Section -->
  <fieldset class="space-y-6">
    <legend class="text-lg font-medium text-gray-900">
      Basic Information
    </legend>
    
    <!-- Field Group -->
    <div class="space-y-4">
      <!-- Single Field -->
      <div class="space-y-1">
        <label class="text-sm font-medium text-gray-700" for="name">
          Supplement Name
        </label>
        <input 
          type="text"
          id="name"
          class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <!-- Related Fields Group -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-700" for="dosage">
            Dosage
          </label>
          <input type="number" id="dosage" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium text-gray-700" for="unit">
            Unit
          </label>
          <select id="unit" />
        </div>
      </div>
    </div>
  </fieldset>

  <!-- Form Actions -->
  <div class="flex justify-end space-x-3 pt-6 border-t border-gray-200">
    <button type="button" class="btn-secondary">
      Cancel
    </button>
    <button type="submit" class="btn-primary">
      Save Supplement
    </button>
  </div>
</form>
```

**Design Rationale:**

- Single column layout: Reduces cognitive load and improves scanning
- Logical grouping: Related fields are visually connected
- Clear hierarchy: Fieldsets and legends for content organization
- Consistent spacing: Predictable visual rhythm
- Responsive design: Adapts to different screen sizes

### Field Validation States

```jsx
<!-- Valid Field -->
<div class="space-y-1">
  <label class="text-sm font-medium text-gray-700">
    Supplement Name
  </label>
  <div class="relative">
    <input 
      type="text"
      class="w-full pl-3 pr-10 py-2 border border-green-500 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
      value="Vitamin D3"
    />
    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <CheckCircleIcon class="h-5 w-5 text-green-500" />
    </div>
  </div>
  <p class="text-sm text-green-600">Valid supplement name</p>
</div>

<!-- Error Field -->
<div class="space-y-1">
  <label class="text-sm font-medium text-gray-700">
    Dosage
  </label>
  <div class="relative">
    <input 
      type="number"
      class="w-full pl-3 pr-10 py-2 border border-red-500 rounded-md shadow-sm focus:ring-2 focus:ring-red-500 focus:border-transparent"
      value="-50"
    />
    <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
      <ExclamationCircleIcon class="h-5 w-5 text-red-500" />
    </div>
  </div>
  <p class="text-sm text-red-600">Dosage must be a positive number</p>
</div>
```

**Design Rationale:**

- Clear visual feedback: Distinct colors for different states
- Consistent iconography: Visual reinforcement of state
- Helpful messages: Clear guidance for error resolution
- Accessible feedback: Color is not the only indicator

## Data Visualization

### Charts and Graphs

```jsx
<!-- Metric Card with Trend -->
<div class="bg-white rounded-lg shadow p-6">
  <div class="flex justify-between items-start">
    <div>
      <p class="text-sm font-medium text-gray-500">
        Daily Intake
      </p>
      <p class="text-2xl font-semibold text-gray-900">
        2,450mg
      </p>
    </div>
    <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-green-100 text-green-800">
      +12%
    </span>
  </div>
  
  <!-- Sparkline Chart -->
  <div class="mt-4 h-16">
    [Chart Component]
  </div>
</div>

<!-- Bar Chart Container -->
<div class="bg-white rounded-lg shadow p-6">
  <div class="space-y-4">
    <h3 class="text-lg font-medium text-gray-900">
      Supplement Usage
    </h3>
    <div class="h-64">
      [Chart Component]
    </div>
    <div class="flex justify-between text-sm text-gray-500">
      <span>Last 7 Days</span>
      <span>Today</span>
    </div>
  </div>
</div>
```

**Design Rationale:**

- Contained presentation: Clear boundaries for data visualization
- Consistent container styling: Matches other components
- Appropriate sizing: Readable but not overwhelming
- Clear labeling: Context for the data presented

## Modal Dialogs

### Standard Modal

```jsx
<!-- Modal Backdrop -->
<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity">
  <!-- Modal Container -->
  <div class="fixed inset-0 z-10 overflow-y-auto">
    <div class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
      <!-- Modal Content -->
      <div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
        <!-- Header -->
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <div class="sm:flex sm:items-start">
            <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 class="text-lg font-semibold leading-6 text-gray-900">
                Add New Supplement
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Enter the supplement details below
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Content -->
        <div class="bg-white px-4 pb-4 pt-5 sm:p-6">
          [Form Content]
        </div>

        <!-- Footer -->
        <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button type="button" class="btn-primary sm:ml-3">
            Save
          </button>
          <button type="button" class="btn-secondary mt-3 sm:mt-0">
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Design Rationale:**

- Semi-transparent backdrop: Maintains context while focusing attention
- Responsive behavior: Centers on desktop, bottom sheet on mobile
- Clear visual hierarchy: Distinct header, content, and action areas
- Proper spacing: Comfortable reading and interaction areas

### Confirmation Modal

```jsx
<div class="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
  <div class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
    <div class="sm:flex sm:items-start">
      <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
        <ExclamationTriangleIcon class="h-6 w-6 text-red-600" />
      </div>
      <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
        <h3 class="text-lg font-semibold text-gray-900">
          Delete Supplement
        </h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">
            Are you sure you want to delete this supplement? This action cannot be undone.
          </p>
        </div>
      </div>
    </div>
  </div>
  <div class="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
    <button type="button" class="btn-danger sm:ml-3">
      Delete
    </button>
    <button type="button" class="btn-secondary mt-3 sm:mt-0">
      Cancel
    </button>
  </div>
</div>
```

**Design Rationale:**

- Warning icon: Visual emphasis for destructive actions
- Clear consequences: Explicit description of the action's impact
- Action emphasis: Dangerous actions are visually distinct

## Loading States

### Skeleton Loading

```jsx
<!-- Card Skeleton -->
<div class="bg-white shadow rounded-lg p-6 animate-pulse">
  <div class="space-y-4">
    <!-- Title Skeleton -->
    <div class="h-4 bg-gray-200 rounded w-3/4"></div>
    
    <!-- Content Skeleton -->
    <div class="space-y-2">
      <div class="h-4 bg-gray-200 rounded"></div>
      <div class="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
</div>

<!-- Table Skeleton -->
<div class="animate-pulse">
  <div class="space-y-4">
    <div class="h-8 bg-gray-200 rounded"></div>
    <div class="space-y-2">
      {Array(5).fill().map((_, i) => (
        <div key={i} class="h-6 bg-gray-200 rounded"></div>
      ))}
    </div>
  </div>
</div>
```

**Design Rationale:**

- Maintains layout: Prevents content jumping
- Subtle animation: Indicates loading without distraction
- Progressive disclosure: Shows content structure before data
- Reduced contrast: Clearly indicates placeholder state

### Inline Loading

```jsx
<!-- Loading Button -->
<button class="btn-primary inline-flex items-center" disabled>
  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
  Processing...
</button>

<!-- Loading Overlay -->
<div class="relative">
  <div class="absolute inset-0 bg-white bg-opacity-50 flex items-center justify-center">
    <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-white bg-blue-500 transition ease-in-out duration-150 cursor-not-allowed">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Loading...
    </div>
  </div>
  [Content]
</div>
```

**Design Rationale:**

- Clear feedback: Shows system status
- Contextual placement: Loading indicators near affected content
- Subtle animation: Indicates activity without distraction
- Appropriate contrast: Visible but not overwhelming
