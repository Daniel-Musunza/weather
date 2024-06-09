import React, { useState } from 'react'
import icons from '../utils/icons'
import { Link } from 'react-router-dom'


const NavBar = () => {

    const[openToogle, setOpenToggle] = useState(false);
    const[showBars, setShowBars] = useState(true);
    const[showSearch, setShowSearch] = useState(true);

    const handleOpenToggle = (btn) => {
        if(!openToogle && btn === 'bars') {
            setShowBars(true);
            setShowSearch(false);
            setOpenToggle(true);
        }else if(!openToogle && btn === 'search') {
            setShowBars(false);
            setShowSearch(true);
            setOpenToggle(true);
        }else if(openToogle) {
            setShowBars(true);
            setShowSearch(true);
            setOpenToggle(false);
        }
    }

  return (
    <div className='flex flex-col gap-[30px] relative '>
      <div className="padding-x w-[100%] flex flex-row items-center justify-between py-[30px] shadow-md ">
        <div className="flex xl:hidden">
            {showBars && (
                <button
                onClick={() => handleOpenToggle('bars')}
                className='bg-lightBlue h-[40px] w-[40px] text-[20px] text-white rounded-[50%]'
                >{openToogle ? icons.markX : icons.bars}</button>
            )}
        </div>
        <div className="flex flex-row ">
            <h1 className='font-[600] text-[25px] text-darkBlue-2'>turystyczny <span className='text-[#3572EF]'>ninja</span></h1>
        </div>
        <div className="hidden xl:flex flex-row items-center justify-center gap-[40px]">
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/coconut-tree-6-svgrepo-com.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>Last Minute</Link>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/all-inclusive.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>All Inclusive</Link>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/wakacje.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>Holidays</Link>
            </div>
            <div className="flex flex-row items-center gap-[10px]">
                <img src="../../images/icons/first-minute.svg" alt="" 
                className='h-[25px] w-[25px]'
                />
                <Link to= "" className='font-[600] text-[18px] text-black'>Fast Minute</Link>
            </div>
        </div>
        <div className="hidden xl:flex">
        <div className="relative w-full">
            <input
                type="text"
                className="w-full pl-3 pr-10 py-2 border-[2px] border-[#7286D3] focus:outline-none rounded-[10px]"
                placeholder="Search..."
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                <div className="flex items-center justify-center bg-[#7286D3] w-8 h-8 rounded-[10px]">
                    <span className='text-white'>{icons.search}</span>
                </div>
            </div>
        </div>
        </div>
        <div className="flex xl:hidden">
            {showSearch && (
                <button
                onClick={() => handleOpenToggle('search')}
                className='bg-lightBlue h-[40px] w-[40px] text-[20px] text-white rounded-[50%] flex flex-row justify-center items-center'
                >{openToogle ? icons.markX : icons.search}</button>
            )}
        </div>
      </div>
      <div className="padding-x hidden xl:flex flex-row items-center gap-[20px]">
      <Link to="" className='font-[600] text-[14px]'>BEACHES</Link>
         <Link to="" className='font-[600] text-[12px]'>WHERE TO GO ON VACATION</Link>
         <Link to="" className='font-[600] text-[12px]'>FLIGHTS</Link>
         <Link to="" className='font-[600] text-[12px]'>PRICES</Link>
         <Link to="" className='font-[600] text-[12px]'>WARM COUNTRIES</Link>
         <Link to="" className='font-[600] text-[12px]'>OPINIONS</Link>
         <Link to="" className='font-[600] text-[12px]'>ATTRACTIONS</Link>
      </div>
        {openToogle && (
            <div className="z-[999] absolute flex flex-row w-[100%] bg-white mt-[100px]">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quam eius voluptates laborum officia quidem doloribus? Atque adipisci eos veniam eius, pariatur voluptas voluptate, corporis similique rem impedit quas nam suscipit.
                Iure incidunt suscipit natus cumque deleniti rem, obcaecati ad facilis totam distinctio. Laboriosam repellat similique asperiores ad ducimus iusto soluta odit. Sequi, vero quae ratione et eius quisquam nulla neque?
                Molestias perferendis nihil a mollitia, rem quis ad odit, hic reiciendis iure nam, non nobis praesentium quisquam? Molestias eligendi quidem aut quisquam architecto eveniet eaque. Libero exercitationem quos minus nesciunt.
                Nisi ipsam inventore similique delectus eaque cum, laudantium dolorum excepturi necessitatibus quasi maxime atque odio cumque consequuntur, corporis, tenetur officiis. Totam neque eligendi molestias est labore laudantium modi, reiciendis voluptate.
                Neque nostrum saepe harum, odit velit cumque officiis placeat? Accusantium nisi maxime recusandae delectus cupiditate! Voluptates iusto debitis eum corporis cum officia veniam asperiores iste ab odit. Rerum, ad consectetur!
                Odio numquam sit autem obcaecati, eligendi veritatis, nemo aut temporibus quia doloremque magnam et blanditiis nobis iure maxime tenetur aliquam accusamus provident quas consequatur! Fuga molestias ipsum impedit dolorum quibusdam.
                Totam adipisci sunt voluptate sed, quod iure neque harum autem cumque labore vero rem, optio suscipit voluptatem iusto! Asperiores corporis incidunt neque placeat porro eligendi itaque veritatis est veniam eius!
                Natus nihil et asperiores corrupti beatae architecto consequatur voluptatibus possimus nobis nostrum vitae qui omnis, nulla autem quo incidunt consectetur modi provident sunt iste expedita optio, dolorem quod? Dolorum, dolor!
                Numquam sed blanditiis qui rem laboriosam tempora, officiis quis nobis fugiat eligendi, dolorem consequatur labore unde aspernatur. Exercitationem delectus corporis nulla impedit non, vero enim nobis ipsam quos! Facilis, voluptatum!
                Non praesentium pariatur eos accusantium dolorum unde iusto in? Inventore facere animi, qui sapiente ipsum saepe dolor minima temporibus dignissimos nobis cum quam, sit eveniet a at perspiciatis illo doloremque.
                Explicabo pariatur maxime obcaecati, doloremque esse vero nemo facere! Mollitia quod odio illo culpa enim repellendus quam possimus animi error neque veniam magnam repudiandae earum dolor esse, impedit delectus facere?
                Ad libero tenetur, sequi facilis, ipsam reprehenderit quam dolorum error ut nihil architecto eveniet quis ab illum voluptatem nemo excepturi praesentium et est laboriosam itaque. Explicabo ipsa in voluptates optio.
                At facilis iste incidunt asperiores ab voluptas quibusdam, ipsam doloribus et soluta blanditiis obcaecati rem tenetur aperiam fuga magni autem pariatur? Libero doloribus numquam fugiat soluta, expedita impedit autem minima?
                Qui at, quam eos mollitia ex aliquam hic quos, odit iusto laudantium itaque dolorem aperiam. Praesentium, iure perferendis! Veniam rerum consequuntur ut blanditiis, quaerat assumenda cupiditate est excepturi explicabo exercitationem!
                Corrupti possimus quibusdam qui ab corporis repellat, ex sint consectetur perspiciatis modi, doloremque soluta officiis illum pariatur voluptate vitae architecto numquam est! Exercitationem, rerum! Velit sed commodi eligendi soluta. Minus.
                Velit eligendi neque fuga itaque corporis nesciunt labore aut assumenda illo molestiae animi, facere voluptatibus, dolore maiores numquam autem error aspernatur voluptatem sed necessitatibus! Ipsum doloribus repellendus possimus sapiente pariatur.
                Molestiae, quaerat iure eum iusto nam nulla, omnis quibusdam quisquam beatae sunt vel? Minus, reiciendis voluptate molestias voluptatem pariatur saepe illo. Rerum atque cumque quia amet consequuntur consectetur quis esse.
                Deserunt delectus magni sit quasi, iure maiores, repellendus accusantium consectetur ut officia, est ab tenetur expedita dolore libero ratione eligendi maxime a tempora ipsum molestiae. Maiores iusto est dolor fugiat!
                Placeat atque accusamus doloremque quo minima, provident officia, labore ipsum beatae vel nihil nam! Aliquid, beatae numquam modi consectetur adipisci corrupti, voluptatem optio quisquam a saepe voluptas hic, odio minus?
                Nobis earum voluptates eos. Quaerat, nam voluptas fugiat et quibusdam ipsa, ut a possimus non corporis dicta libero deserunt, sapiente quod temporibus vitae accusamus! Molestias voluptates eaque consequuntur voluptatum nulla.
            </div>
        )}
    </div>
  )
}

export default NavBar
