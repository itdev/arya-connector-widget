# arya-connector-widget

## Usage
        import AryaWidget from '@aryaworks/arya-connector-widget'
        function App() {
            return (
                <AryaWidget
                user='user@email.com'
                auth={"secret_token"}
                widget={"widget_id"}
                />
            );
        }

## Available Scripts

### `npm run build`

Builds the widget for production to the `dist` folder.<br>
It correctly bundles the widget component in production mode and optimizes the build for the best performance.

## Development

- For development, you will need [Node.js](https://nodejs.org/en/download/) installed on your environment.
- Clone this repo: `git clone https://github.com/Arya-Works/arya-connector-widget`
- From root directory run `npm install` to install project dependencies.
