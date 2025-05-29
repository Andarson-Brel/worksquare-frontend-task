# WorkSquare Real Estate Platform




## Architecture Documentation




### File Structure

![File Structure](https://res.cloudinary.com/dbandara/image/upload/v1748445091/file-structure_kv6555.png)



### Key Architectural Decisions

1. **Component-Based Architecture**
   - Modular components with single responsibilities
   - Clear separation between UI components and business logic
   - Reusable components for consistent UI patterns

2. **Custom Hooks for State Management**
   - Used React's built-in hooks (useReducer, useState) instead of external state management libraries
   - Created specialized hooks like `useListings` to encapsulate data fetching and state management
   - Implemented utility hooks (`useDebounce`, `useThrottle`) for performance optimization

3. **TypeScript Integration**
   - Comprehensive type definitions for all components and data structures
   - Interface-driven development for property listings and filter states
   - Enhanced developer experience and code reliability

4. **Next.js App Router**
   - Leveraged Next.js 14's App Router for efficient routing
   - Dynamic routes for property details (`/property/[id]`)
   - Optimized for performance with client-side navigation

5. **UI Component Library**
   - Used shadcn/ui for consistent, accessible UI components
   - Extended with custom styling via Tailwind CSS
   - Maintained design consistency across the application

## Problem-Solving Approach

### Property Filtering System

**Challenge**: Implement an efficient filtering system that updates in real-time without excessive re-renders.

**Approach**:
1. Created a reducer-based state management system for filter criteria
2. Implemented debouncing for search inputs to prevent excessive filter operations
3. Used memoization to avoid unnecessary recalculations of filtered results
4. Designed a clear UI for filter controls with visual feedback

**Implementation**:
```typescript
// Excerpt from useListings.ts
const [state, dispatch] = useReducer(listingsReducer, initialState);

const setFilter = (filters: Partial<typeof state.filters>) => {
  dispatch({ type: "SET_FILTER", payload: filters });
  dispatch({ type: "APPLY_FILTERS" });
};

// Excerpt from search-filters.tsx
const debouncedSearchTerm = useDebounce(localSearchTerm, 300);

React.useEffect(() => {
  if (debouncedSearchTerm !== filters.searchTerm) {
    onFiltersChange({ searchTerm: debouncedSearchTerm });
  }
}, [debouncedSearchTerm, filters.searchTerm, onFiltersChange]);
```

### Responsive Property Card Design

**Challenge**: Create a property card component that displays well across all device sizes while maintaining information hierarchy.

**Approach**:
1. Designed a flexible card layout using CSS Grid and Flexbox
2. Implemented responsive breakpoints for different screen sizes
3. Prioritized critical information (price, location, bedrooms) on smaller screens
4. Used text truncation for longer descriptions

**Implementation**:
```tsx
// Excerpt from property-card.tsx
<Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
  <CardContent className="p-0 h-full">
    <div className="flex flex-col sm:flex-row h-full items-stretch">
      {/* Image on the top for mobile, on the left for desktop/tablet */}
      <div className="relative w-full sm:w-48 sm:h-full flex-shrink-0">
        <img
          src={`/placeholder.svg?height=160&width=192&text=${listing.title.slice(0, 20)}`}
          alt={listing.title}
          className="w-full h-full object-cover"
        />
        {/* Badge indicators */}
      </div>
      
      {/* Content below the image for mobile, on the right for desktop/tablet */}
      <div className="flex-1 p-4 h-full flex flex-col justify-between">
        {/* Property details */}
      </div>
    </div>
  </CardContent>
</Card>
```

### Dynamic Property Details Page

**Challenge**: Create a dynamic property details page that loads individual property data efficiently.

**Approach**:
1. Implemented dynamic routing with Next.js App Router
2. Created a comprehensive property details component with sections for different information
3. Added loading states and error handling
4. Implemented a back navigation system

## Trade-offs Made

### 1. Client-Side Filtering vs. Server-Side Filtering

**Decision**: Implemented client-side filtering using in-memory data.

**Trade-offs**:
- ✅ **Pros**: 
  - Faster initial implementation
  - Instant filtering without server roundtrips
  - Works offline once data is loaded
  
- ❌ **Cons**:
  - Not scalable for very large datasets
  - Increased client-side memory usage
  - Limited to browser capabilities

**Rationale**: For the current scale of the application with a moderate number of listings, client-side filtering provides a responsive user experience without the complexity of server-side implementation. As the application scales, this would need to be migrated to server-side filtering with pagination.

### 2. Custom Hooks vs. Global State Management

**Decision**: Used custom React hooks with useReducer instead of Redux or other global state libraries.

**Trade-offs**:
- ✅ **Pros**:
  - Reduced dependencies
  - Simpler mental model
  - Better code co-location
  
- ❌ **Cons**:
  - Less standardized approach
  - Potential for prop drilling in deeper component trees
  - No built-in dev tools like Redux DevTools

**Rationale**: The application's state management needs were relatively straightforward, making custom hooks a lightweight and sufficient solution. This approach avoided the overhead of learning and implementing a more complex state management library.

### 3. Static Data vs. API Integration

**Decision**: Used static JSON data instead of a real API.

**Trade-offs**:
- ✅ **Pros**:
  - Simplified development and testing
  - No backend dependencies
  - Predictable data for development
  
- ❌ **Cons**:
  - Not representative of real-world data fetching challenges
  - No real-time updates
  - Limited data set

**Rationale**: This approach allowed for rapid development and testing without backend dependencies. The application is structured to easily replace the static data source with a real API in the future.

### 4. Component Granularity

**Decision**: Created medium-grained components with clear responsibilities.

**Trade-offs**:
- ✅ **Pros**:
  - Balanced reusability and complexity
  - Easier to understand component purposes
  - Reasonable file structure
  
- ❌ **Cons**:
  - Potential for component bloat in complex views

**Rationale**: This level of granularity provided a good balance between maintainability and development speed. Components are specific enough to be reusable but not so granular that the component tree becomes difficult to navigate.

## Screenshots

### Home Page with Property Listings
![Home Page](https://res.cloudinary.com/dbandara/image/upload/v1748446186/home-page_uggaxv.png)

### Property Details Page
![Property Details](https://res.cloudinary.com/dbandara/image/upload/v1748508913/1440w_light_styipz.png)

### Filter Interface
![Filters](https://res.cloudinary.com/dbandara/image/upload/v1748509007/Screenshot_2025-05-29_at_09.56.27_r5yzey.png)

### Mobile Responsive View
![Mobile View](https://res.cloudinary.com/dbandara/image/upload/v1748509671/Screenshot_20250529-100411_Chrome_kgsn25.jpg)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS
- **State Management**: React hooks (useReducer, useState)
- **TypeScript**: For type safety
- **Icons**: Lucide React

## Future Improvements
In the case of working with Large Data, the following improvements can be made
1. **Server-Side Filtering**: Move filtering logic to the server for better performance with large datasets
2. **Authentication**: Add user accounts for saving favorite properties
3. **Real-time Updates**: Implement WebSockets for real-time property updates

