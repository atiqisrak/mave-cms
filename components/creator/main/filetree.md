components/
└── creator/
└── main/
├── layouts/
│ ├── EditorLayout.js # Layout for the main editor interface
│ ├── PageListLayout.js # Layout for the page list interface
├── modals/
│ ├── AddComponentModal.js # Modal for adding new components
│ ├── EditSectionModal.js # Modal for editing a section
│ ├── ConfirmDeleteModal.js # Modal to confirm section or page deletion
├── forms/
│ ├── PageForm.js # Form component for creating/editing pages
│ ├── SectionForm.js # Form for creating/editing sections
│ ├── ComponentForm.js # Form for adding/editing components within a section
├── components/
│ ├── TitleComponent.js # Individual component for title
│ ├── MediaComponent.js # Individual component for media
│ ├── MenuComponent.js # Individual component for menu
│ ├── SliderComponent.js # Individual component for slider
│ ├── CardComponent.js # Individual component for card
│ ├── FormComponent.js # Individual component for form
│ ├── FooterComponent.js # Individual component for footer
│ └── EventComponent.js # Individual component for event
├── parsers/
│ ├── ComponentParser.js # Centralized logic for rendering different components
│ ├── SectionParser.js # Logic to parse and render each section on a page
│ ├── PageParser.js # Logic to parse and render the entire page with sections
├── utils/
│ ├── pageHelpers.js # Utility functions for handling page operations (CRUD)
│ ├── sectionHelpers.js # Utility functions for handling section operations (CRUD)
│ ├── componentHelpers.js # Utility functions for component-related logic
│ ├── generateRandomId.js # Utility for generating random IDs
│ └── api.js # API calls to interact with backend for page/section/component data
├── PageEditor.js # Main page editor component that ties everything together
├── PageList.js # Component for displaying the list of pages with CRUD options
└── ScrollToButton.js # Button to scroll to the bottom of the page
