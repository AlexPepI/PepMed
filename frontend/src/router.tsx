import { lazy, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Loading from "./components/Feedback/Loading";
import {BrowserRouter as Router,Routes,Route} from "react-router";

const Home = lazy(() => import("./pages/Home"));
const NewVisitor = lazy(()=>import("./pages/NewVisitor"))

export function AppRoutes() {
    return(
        <Suspense fallback={<Loading />}>
            <Router>
                <Routes>

                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/new-visitor" element={<NewVisitor/>}/>
                    </Route>
                    
                    <Route path="*" element={<div className="p-6">Not found</div>} />
                </Routes>
            </Router>
        </Suspense>
    )
}
