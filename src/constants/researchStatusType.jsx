import statusMaintenanceIcon from '../assets/images/research1-statusMaintenance.svg'
import statusCleanIcon from '../assets/images/research1-statusClean.svg'
import statusCrowdIcon from '../assets/images/research1-statusCrowd.svg'
import statusFunctionIcon from '../assets/images/research1-statusFunction.svg'
import statusNoiseIcon from '../assets/images/research1-statusNoise.svg'
import statusOutlookIcon from '../assets/images/research1-statusOutlook.svg'
import statusThermalComfortIcon from '../assets/images/research1-statusThermalComfort.svg'
import statusUsageIcon from '../assets/images/research1-statusUsage.svg'
import statusOccupationIcon from '../assets/images/research1-stutusOccupation.svg'

export default [
  [
    {
      status: '維護狀態',
      satusColor: '#9CD6D6',
      statusIcon: statusMaintenanceIcon,
    },
    {
      status: '功能狀態',
      satusColor: '#A4D6FF',
      statusIcon: statusFunctionIcon,
    },
    {
      status: '外觀狀態',
      satusColor: '#A6B6B6',
      statusIcon: statusOutlookIcon,
    },
    {
      status: '佔用狀態',
      satusColor: '#99B1D4',
      statusIcon: statusOccupationIcon,
    },
    {
      status: '清潔狀態',
      satusColor: '#DAAEDB',
      statusIcon: statusCleanIcon,
    },
    {
      status: '使用狀態',
      satusColor: '#FDAFC6',
      statusIcon: statusUsageIcon,
    },
    {
      status: '人潮狀態',
      satusColor: '#FA8888',
      statusIcon: statusCrowdIcon,
    },
    {
      status: '噪音狀態',
      satusColor: '#D3AAB1',
      statusIcon: statusNoiseIcon,
    },
    {
      status: '體感狀態',
      satusColor: '#FCA6D4',
      statusIcon: statusThermalComfortIcon,
    },
  ]
]