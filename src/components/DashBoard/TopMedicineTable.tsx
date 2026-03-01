import TopMedicineData from '@/constants';
import DataTable from './DataTable';

export default function TopMedicineTable() {
     const monthName = new Date().toLocaleDateString("en-US", { month: "long" });
    return (
        <div className='mt-10'>
            <h2 className='mb-5'>Top Selling Medicine - {monthName}</h2>

            <DataTable data={TopMedicineData}/>
        
            

        </div>
    );
}