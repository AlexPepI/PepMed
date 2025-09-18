import { lazy, Suspense } from "react";
import Layout from "./components/Layout/Layout";
import Loading from "./components/Feedback/Loading";
import {BrowserRouter as Router,Routes,Route} from "react-router";

const Home = lazy(() => import("./pages/Home"));
const NewVisitor = lazy(()=>import("./pages/NewVisitor"))
const NewVisit = lazy(()=>import("./pages/NewVisit"))
const VisitorDetails = lazy(()=> import("./pages/VisitorDetails"))
const VisitDetails = lazy(()=> import("./pages/VisitDetails"))
const VisitorUpdate = lazy(()=> import("./pages/VisitorUpdate"))
const VisitUpdate = lazy(()=> import("./pages/VisitUpdate"))

export function AppRoutes() {
    return(
        <Suspense fallback={<Loading />}>
            <Router>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/new-visitor" element={<NewVisitor/>}/>
                        <Route path="/new-visit/:id" element={<NewVisit/>}/>            
                        <Route path="/visitor-details/:id" element={<VisitorDetails/>}/>
                        <Route path="/visit-details/:id" element={<VisitDetails/>}/>
                        <Route path="visit-update/:id" element={<VisitUpdate/>}/>
                        <Route path="/visitor-update/:id" element={<VisitorUpdate/>}/>                   
                    </Route>
                    <Route path="*" element={<div className="p-6">Not found</div>} />
                </Routes>
            </Router>
        </Suspense>
    )
}
