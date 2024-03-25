import TimePunchApiController from '../controllers/TimePunchApiController';
import { Router } from "express";
import HttpUtils from '../HttpUtils';
import auth from "../../auth/authMiddleware";


const timeTrackingRoutes = HttpUtils.asyncRouterHandler(Router());

timeTrackingRoutes.post('/time-punch', auth, new TimePunchApiController().create);
timeTrackingRoutes.get('/time-punch/:year/:month/:day', auth, new TimePunchApiController().getTimePunchesByPeriod);
timeTrackingRoutes.get('/time-punch/report/:employeeId/:year/:month/', auth, new TimePunchApiController().sendTimePunchReport);

export default timeTrackingRoutes;