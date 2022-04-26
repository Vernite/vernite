# Architecture
Architecture of the application is maintained with base Angular methodologies. For more information's about Angular methodologies see [Angular documentation](https://angular.io/guide/file-structure).

## Naming conventions
Each file should be named using only lower case letters and  `-` to replace spaces. Filename should be `<name>.<type>.<extension>` where `<name>` is the name of the file (ex. `hello-world`), `<type>` is the type of the file (ex. `module` or `component`) and the `<extension>` is the extension of the file (ex. `.ts`).

## Single responsibility principle
Each file should have only one responsibility. For example, `src/app/hello-world/hello-world.module.ts` should have only one responsibility to create the module. For more information's about the Single Responsibility Principle see [Wikipedia](https://en.wikipedia.org/wiki/Single_responsibility_principle).

### Modules
App is splitter into separated modules. Each module has it's own folder in `src/app` directory. In this dedicated space each module has it's own `.module.ts` file and optionally `.routing.ts` file.

### Classes
If project is using some additional classes logic like class grouped utility functions or abstract control classes, then they should be placed in dedicated folder in `classes/` directory.

### Components
Components are the main building blocks of the application. They are the most important part of the architecture. Each component has it's own folder in `components/` directory. In this dedicated space each component has it's own `.component.ts` file.

### Decorators
Decorators are used to add additional functionality to the components. For example, `@Component` decorator is used to mark the component as a component. Each decorator has it's own file in `decorators/` directory. In this dedicated space each pipe has it's own `.decorator.ts` file. For more information's about decorators see [Angular documentation](https://angular.io/guide/decorators).

### Dialogs
Dialogs are used to display information to the user. Dialogs are located in `dialogs/` directory. For more information's about dialogs see [Angular documentation](https://angular.io/guide/dialog).

### Directives
Directives are used to add additional functionality to the components. For example, `@Directive` decorator is used to mark the directive as a directive. Each decorator has it's own file in `directives/` directory. In this dedicated space each directive has it's own `.directive.ts` file. For more information's about directives see [Angular documentation](https://angular.io/guide/directives).

### Enums
Enums are used to define the values of the enumeration. Each enumerable value has it's own `enum.ts` file in `enums/` directory.

### Guards
Guards are used to protect routes from unauthorized access. Each guard has it's own folder in `guards/` directory. In this dedicated space each guard has it's own `.guard.ts` file. For more information's about guards see [Angular documentation](https://angular.io/guide/router#can-activate-guards).

### Interfaces
Interfaces are used to structure the code. They are used to describe the shape of the object. For more information's about interfaces see [Angular documentation](https://angular.io/guide/architecture-and-design#interfaces).

### Pipes
Pipes are used to transform data. Each pipe has it's own folder in `pipes/` directory. In this dedicated space each pipe has it's own `.pipe.ts` file. For more information's about pipes see [Angular documentation](https://angular.io/guide/pipes).

### Services
Services are used to share data between components. Each service has it's own `.service.ts` file located in `services/` directory in one of the modules.

### Validators
Validators are used to validate the data (mainly in forms). Each validator has it's own `.validator.ts` file located in `validators/` directory in one of the modules.
