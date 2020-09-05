global['__DEV__'] = false
import { AppRegistry } from "react-native"
import 'mobx-react-lite/batchingForReactDom'
import App from "./App"

AppRegistry.registerComponent("App", () => App);

AppRegistry.runApplication("App", {
  rootTag: document.getElementById("root")
});
