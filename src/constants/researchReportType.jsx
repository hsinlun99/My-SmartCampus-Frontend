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
      reportType: '維護狀態',
      reportTypeColor: '#9CD6D6',
      reportTypeIcon: statusMaintenanceIcon,
    },
    {
      reportType: '功能狀態',
      reportTypeColor: '#A4D6FF',
      reportTypeIcon: statusFunctionIcon,
    },
    {
      reportType: '外觀狀態',
      reportTypeColor: '#A6B6B6',
      reportTypeIcon: statusOutlookIcon,
    },
    {
      reportType: '佔用狀態',
      reportTypeColor: '#99B1D4',
      reportTypeIcon: statusOccupationIcon,
    },
    {
      reportType: '清潔狀態',
      reportTypeColor: '#DAAEDB',
      reportTypeIcon: statusCleanIcon,
    },
    {
      reportType: '使用狀態',
      reportTypeColor: '#FDAFC6',
      reportTypeIcon: statusUsageIcon,
    },
    {
      reportType: '人潮狀態',
      reportTypeColor: '#FA8888',
      reportTypeIcon: statusCrowdIcon,
    },
    {
      reportType: '噪音狀態',
      reportTypeColor: '#D3AAB1',
      reportTypeIcon: statusNoiseIcon,
    },
    {
      reportType: '體感狀態',
      reportTypeColor: '#FCA6D4',
      reportTypeIcon: statusThermalComfortIcon,
    },
  ]
]