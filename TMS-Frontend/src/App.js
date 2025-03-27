import Layout from "./components/Layout";

// Import Pages Here
// Common Pages
import Landing from "./pages/Landing";

import {Routes, Route} from "react-router-dom";


function App() {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                {/*Public Routes*/}
                <Route path="/" element={<Landing/>}/>
            </Route>
        </Routes>
    );
}

export default App;
