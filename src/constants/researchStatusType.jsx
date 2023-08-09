import detailStatusMaintenanceIcon from '../assets/images/research1-detailStatusMaintenance.svg'
import detailStatusCleanIcon from '../assets/images/research1-detailStatusClean.svg'
import detailStatusCrowdIcon from '../assets/images/research1-detailStatusCrowd.svg'
import detailStatusFunctionIcon from '../assets/images/research1-detailStatusFunction.svg'
import detailStatusNoiseIcon from '../assets/images/research1-detailStatusNoise.svg'
import detailStatusOutlookIcon from '../assets/images/research1-detailStatusOutlook.svg'
import detailStatusThermalComfortIcon from '../assets/images/research1-detailStatusThermalComfort.svg'
import detailStatusUsageIcon from '../assets/images/research1-detailStatusUsage.svg'
import detailStatusOccupationIcon from '../assets/images/research1-detailStatusOccupation.svg'

export default [
  [
    {
      status: '維護狀態',
      satusColor: '#9CD6D6',
      statusIcon: detailStatusMaintenanceIcon,
    },
    {
      status: '功能狀態',
      satusColor: '#A4D6FF',
      statusIcon: detailStatusFunctionIcon,
    },
    {
      status: '外觀狀態',
      satusColor: '#A6B6B6',
      statusIcon: detailStatusOutlookIcon,
    },
    {
      status: '佔用狀態',
      satusColor: '#99B1D4',
      statusIcon: detailStatusOccupationIcon,
    },
    {
      status: '清潔狀態',
      satusColor: '#DAAEDB',
      statusIcon: detailStatusCleanIcon,
    },
    {
      status: '使用狀態',
      satusColor: '#FDAFC6',
      statusIcon: detailStatusUsageIcon,
    },
    {
      status: '人潮狀態',
      satusColor: '#FA8888',
      statusIcon: detailStatusCrowdIcon,
    },
    {
      status: '噪音狀態',
      satusColor: '#D3AAB1',
      statusIcon: detailStatusNoiseIcon,
    },
    {
      status: '體感狀態',
      satusColor: '#FCA6D4',
      statusIcon: detailStatusThermalComfortIcon,
    },
  ]
]