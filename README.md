# Primebox

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.11.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

Datos de entrada:
- Precio de la onza Troy de plata (o oro) en USD: [valor]
- Tipo de cambio USD a BOB: [valor]

Instrucciones:

1. **Calcular precio por gramo de metal puro (100% pureza)**:
   - 1 onza Troy = 31.1035 gramos
   - Precio por gramo en USD = (Precio onza Troy) / 31.1035
   - Precio por gramo en BOB = (Precio por gramo USD) × (Tipo de cambio)

2. **Generar DOS tablas**:

   **Tabla A – Precios de plata por porcentaje de ley**:
   - Columnas: "Ley (%)", "Milésimas", "Precio/gr (BOB)", "Precio/gr -6% (BOB)"
   - Leyes: 100%, 99%, 98%, 97%, 96%, 95%, 94%, 93%, 92%, 91%, 90%, 85%, 80%, 75%, 70%, 60%, 50%
   - Fórmula: Precio/gr = (Precio puro) × (Ley%/100)
   - Precio -6% = Precio/gr × 0.94

   **Tabla B – Precios de oro por quilate (joyería)**:
   - Columnas: "Quilates", "% oro teórico", "% oro con -2% ajuste", "Precio/gr (BOB)", "Precio/gr -6% (BOB)"
   - Quilates: 24k, 18k, 14k, 10k
   - % teórico: 24k=100%, 18k=75%, 14k=58.333%, 10k=41.667%
   - % con -2% ajuste: reducir 2 puntos porcentuales al % teórico (ej: 18k: 75% → 73%)
   - Fórmula precio: Precio/gr = (Precio puro oro) × (% ajustado/100)
   - Precio -6% = Precio/gr × 0.94

3. **Mostrar todos los cálculos paso a paso al inicio y verificar los datos internamente**.
To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
