# Equipment Management

**Deploy:** 

## Overview
The `Equipment` class is instantiated based on values retrieved from .JSON files, generating objects for each piece of equipment. Supporting classes for the `Position` and `State` entities are established, and every equipment object contains arrays from these classes. Within `App.tsx`, all equipment objects are propagated to the `sidebar` and `map` components.

The `sidebar` has a scrolling section (utilizing Radix scrollArea) that presents a "card" for each piece of equipment, detailing its attributes such as name, model, current state, and so forth. Each "card" further embeds an "accordion" which unveils another scrollArea that showcases the state history of that specific equipment. At the top of the sidebar, there are three "select" components that aid in filtering equipment by name, model, or their current state.

The `map` component, powered by Leaflet, displays geographical coordinates. A distinct "marker" on the map represents each equipment. These markers are visually differentiated by their icons and colors, correlating to their model (cargo truck, trace grapple, or harvester) and state (idle, working, or under maintenance). Clicking on a marker pops up more details about the corresponding equipment, along with an option to view its state history.

## Tech Stack

- ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
- ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
- ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

- [Radix-UI Components](https://www.radix-ui.com/)
- [Phospor-Icons](https://phosphoricons.com/)


