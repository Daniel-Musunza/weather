import React from 'react';


const BottomTabs = () => {
  return (
    <div className="fixed md:hidden bottom-0 w-full z-[999] bg-white border-t border-gray-200">
      <div className="flex justify-around items-center py-2">
        <button className="flex flex-col items-center gap-[5px]">
            <img src="../../images/icons/wakacje.svg" alt="" 
                    className='h-[25px] w-[25px]'
            />
            <span className="text-[10px] font-[600] text-darkBlue-2">Holidays</span>
        </button>
        <button className="flex flex-col items-center gap-[5px]">
            <img src="../../images/icons/all-inclusive.svg" alt="" 
                    className='h-[25px] w-[25px]'
            />
            <span className="text-[10px] font-[600] text-darkBlue-2">All Inclusive</span>
        </button>
        <button className="flex flex-col items-center gap-[5px]">
            <img src="../../images/icons/coconut-tree-6-svgrepo-com.svg" alt="" 
                className='h-[25px] w-[25px]'
            />
            <span className="text-[10px] font-[600] text-darkBlue-2">Exoticism</span>
        </button>
        <button className="flex flex-col items-center gap-[5px]">
            <img src="../../images/icons/passport-1.svg" alt="" 
                className='h-[25px] w-[25px]'
            />
            <span className="text-[10px] font-[600] text-darkBlue-2">No passport</span>
        </button>
      </div>
    </div>
  );
};

export default BottomTabs;
