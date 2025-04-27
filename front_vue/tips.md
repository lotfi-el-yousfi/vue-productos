# 📦 Project Structure & Application Flow (Vue 3 Domain-Driven)

---

## 📁 Folder Structure
````
├── components/ 
│   └── youComponent.vue 
├── models/
│   ├──product.ts
├── services/
│   ├── composables/
│   ├── resources/
│   ├── ├── api-calls_services.ts 
├── stores/
├── views/
├──router.ts
---
````
## 🔄 Application Flow Description

1. **🔗 Routing Layer (Vue Router)**
    - Defined in `router/index.js`
    - Maps paths to `views/` components.
    - Uses **navigation guards** for route protection.
    - If passed, loads the corresponding **View component**.

2. **📺 View Layer (`views/`)**
    - Acts as page-level controller.
    - Loads domain-specific **components/**.
    - Passes props and listens for emitted events.
    - Calls **store actions** for data operations.

3. **🧩 Component Layer (`components/`)**
    - Functional, reusable UI pieces.
    - Organized into subfolders:
        - `ui/` → Presentational components.
        - `business/` → Logic-heavy UI components.
        - `container/` → Data-fetching or coordinating components.
    - Uses **props** for data in, **emits** for events out.
    - Calls **store actions** via Pinia composables.

4. **📦 Store Layer (`stores/`)**
    - Manages local state using **Pinia**.
    - Exposes **actions** that trigger **services**.
    - Holds **state** and computed **getters**.

5. **🌐 Service Layer (`services/`)**
    - Handles external **API requests**.
    - Organized under:
        - `resources/` for API call implementations.
        - `type-guards/` for runtime type validation.
        - `composables/` for reusable hooks.
    - Returns data in **models-compliant** format.

6. **📑 Models Layer (`models/`)**
    - Centralized **TypeScript interfaces/classes**.
    - Shared between services, stores, and components.
    - Guarantees **data type consistency**.

7. **🔁 Data Flow Summary**
    - User navigates via Router →  
      Guards validate →  
      **View** loads →  
      **Components** render →  
      Dispatch actions to **Store** →  
      Call **Services** →  
      Fetch/submit via API →  
      Return **Models** →  
      Update **Store** →  
      Rerender **Components**.

---


✅ Full Flow Summary
- User navigates via Router
- Guards run — allow or block
- View loads
- View loads domain-specific Components
- Components dispatch to Store
- Store calls Service
- Service calls API
- Service maps response into Models
- Store updates state
- Components and Views reflect updated state
- Every step respects:
- interfaces in models/
- domain separation
- type safety

clean unidirectional data flow
✅ This clean, domain-driven modular structure ensures:
- Predictable, maintainable code.
- Strong separation of concerns.
- Type safety through centralized **models**.
- Scalable feature addition via domain encapsulation.

