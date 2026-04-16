import Monthly_Sales from '@/charts/Monthly_Sales'
import Top_Selling_Medicine from '@/charts/Top_Selling_Medicine'
import Weekly_Items from '@/charts/Weekly_Items'
import Weekly_Sales from '@/charts/Weekly_Sales'
import { WelcomeScreen } from '@/components/DashBoard'
import { DashHeading } from '@/components/Global'

const Dashboard = () => {
  
  return (
    <section className='pb-20'>
      
      <div className='mb-5'>
        <DashHeading Title='Dashboard' />
        <WelcomeScreen />
      </div>

      <div className='flex flex-col lg:flex-row gap-10 mb-5'>
        <Weekly_Sales />
        <Top_Selling_Medicine />
      </div>

      <div className='flex flex-col lg:flex-row gap-10 mb-5'>
        <Weekly_Items />
        <Monthly_Sales />
      </div>

      </section>
  )
}

export default Dashboard