import Image from 'next/image';
import './importantlinkspage.css'
import DownArrow from '@/app/assets/icons/arrow-down.png'
import Link from 'next/link';
const CollegeInfo = () => {
  return <div>
    <table className="">
      <thead className="w-full">
        <tr>
          <th>Sl.No.</th>
          <th className="w-2/4">Links</th>
          <th>Date</th>
        </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td className=" importantlinks"><Link href={'https://bitsindri.ac.in'} target='_blank' className='flex items-center'>Semester registration <Image src={DownArrow} alt='' width={30} height={30} /></Link></td>
            <td>1</td>
          </tr>
          <tr>
            <td>1</td>
            <td className=" importantlinks "><Link href={''} target='_blank' className='flex items-center'>Semester registration <Image src={DownArrow} alt='' width={30} height={30} /></Link></td>
            <td>1</td>
          </tr>
          <tr>
            <td>1</td>
            <td className=" importantlinks "><Link href={''} target='_blank' className='flex items-center'>Semester registration <Image src={DownArrow} alt='' width={30} height={30} /></Link></td>
            <td>1</td>
          </tr>
        </tbody>
    </table>
  </div>;
};

export default CollegeInfo;
