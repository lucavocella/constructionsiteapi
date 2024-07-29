# ConstructionSiteAPI Proof of Concept

ConstructionSiteAPI is a proof of concept that allows manufacturers to digitally represent construction sites. This API offers a streamlined way to create different construction site scenarios through a clean and visual UI, developed using Three.js, and a parametric model that adapts based on dimensions taken at the worksite.

## Key Features

- **Digital Representation**: Easily create a digital version of your construction site.
- **Parametric Modeling**: Dynamic models that change according to worksite measurements.
- **Three.js UI**: Intuitive and visual interface built with Three.js for a seamless user experience.
- **JSON REST API**: Generates a standardized JSON output that can be read by any CAD/BIM platform.
- **Automation**: Facilitates the storage of worksite information in a standardized way, helping developers automate the workflow for creating 2D or 3D drawings from the JSON representation of the context where the product will be placed.

## Usage

1. **Initialize the Template Class**:
    - The template class is located in the `components` folder. It allows you to build various construction site scenarios.

2. **Example - Niche Class**:
    - An example of the `niche` class is provided to help developers understand the workflow.
    - In the `niche` component, you need to define the parameters and the geometry, which currently consists of multiple boxes.
    - The `components` folder also includes other 3D objects and useful components like `kricanvas`, an improved version of canvas that can be reused in all templates.

3. **Parameter Input**:
    - The `parameterInput` component generates a form that controls the parameters specified in the `niche` class.

4. **Rendering**:
    - Use the `render` and `renderjson` functions in the template class to render the object with Three.js or to generate a JSON representation.
    - To activate the JSON representation, append `?json=1` to the query string of the URL.

## Getting Started

To get started with ConstructionSiteAPI, clone this repository and follow the setup instructions in the README file in the frontend and backend folder.

```bash
git clone https://github.com/yourusername/ConstructionSiteAPI.git
cd ConstructionSiteAPI
cd frontend 
docker-compose up -d
```

# Support the project

If you find this project useful and would like to support further development, consider making a donation. Your support helps keep the project alive and growing! Click on the link below:
Buy me a beer: [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/donate/?hosted_button_id=SX6JC6E6GE7JL)
