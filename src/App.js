import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import DashboardPage from './pages/dashboard/dashboard';
import RegisterComponent from "./Pages/Register/Register";
import LoginComponent from "./Pages/Login/Login";
import ForgotComponent from "./Pages/Forgot/Forgot";
import RenderingValues from "./Pages/ReactQuery/reactqueryIntro";
import { QueryClient, QueryClientProvider } from "react-query";
import { createTheme, ThemeProvider } from "@mui/material";
import RenderingValuesWithUseQuery from "./Pages/ReactQuery/useQuery";
import HandlingQueryError from "./Pages/ReactQuery/handlingQueryError";
import IsFetchingObserve from "./Pages/ReactQuery/queryCacheAndStale";
import RefetchOnMounting from "./Pages/ReactQuery/refetchQuery";
import GetDataOnClick from "./Pages/ReactQuery/getDataOnEvent";
import SuccessAndFailure from "./Pages/ReactQuery/successAndErrorCallback";
import DataTransformation from "./Pages/ReactQuery/dataTransformation";
import CustomhookParent from "./Pages/ReactQuery/usingCustomHook";
import CustomhookParentById from "./Pages/ReactQuery/useQueryById";
import DashboardComponent from "./Pages/Dashboard/Dashboard";
import LeaveComponent from "./Pages/Leave/Leave";
import RenderingWholeSuperHero from "./Pages/ReactQuery/basePageQueryId";
import ParalellQuery from "./Pages/ReactQuery/parallelQuery";
import StatisticsComponent from "./Pages/Statistics/Statistics";
import CalendarComponent from "./Pages/Calendar/Calendar";
import ProfileComponent from "./Pages/Profile/Profile";
import PrivateRouteComponent from "../src/PrivateRouting/PrivateRoute";
import CreateNewPasswordComponent from "./Pages/CreatePassword/CreatePassword";
import "./App.css";

const font = "'Raleway', sans-serif";

function App() {
  const theme = createTheme({
    palette: {
      text: {
        // primary : "#c3217a"
      },
      typography: {
        fontFamily: font,
      },
    },
  });

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
        retryDelay: 2000
      }
    }
  });

  return (
    <>
    <BrowserRouter>
    
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/" element={<LoginComponent />} />

            <Route
              path="/dashboard"
              element={<PrivateRouteComponent Component={DashboardComponent} />}
            />
            <Route
              path="/calendar"
              element={<PrivateRouteComponent Component={CalendarComponent} />}
            />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/forgot" element={<ForgotComponent />} />
            <Route path="/react-query" element={<RenderingValues />} />
            <Route
              path="/values-useQuery"
              element={<RenderingValuesWithUseQuery />}
            />
            <Route path="/handling-error" element={<HandlingQueryError />} />
            <Route path="/stale-time" element={<IsFetchingObserve />} />
            <Route path="/refetch-mount" element={<RefetchOnMounting />} />
            <Route path="/refetch-on-event" element={<GetDataOnClick />} />
            <Route path="/success-failure" element={<SuccessAndFailure />} />
            <Route path="/transformation" element={<DataTransformation />} />
            <Route path="/custom" element={<CustomhookParent />} />
            <Route
              path="/basic/query-id/:id"
              element={<CustomhookParentById />}
            />
            <Route path="/basic" element={<RenderingWholeSuperHero />} />
            <Route path="/paralell" element={<ParalellQuery />} />
            <Route path="/leave" element={<PrivateRouteComponent Component={LeaveComponent}/>} />
            <Route path="/statistics" element={<PrivateRouteComponent Component={StatisticsComponent} />} />
            <Route
              path="/profile"
              element={<PrivateRouteComponent Component={ProfileComponent} />}
            />
            <Route
              path="/reset-password/:token"
              element={<CreateNewPasswordComponent />}
            />
          </Routes>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
    </>
  );
}

export default App;
