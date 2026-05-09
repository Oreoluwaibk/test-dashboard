"use client"
import React, { ReactNode, useCallback } from 'react'
import { App, Layout, Dropdown, MenuProps, Menu, Divider } from 'antd';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Col, Row } from 'antd';
import Logo from "@/assets/logo.png";
// import MaskedLogo from "@/assets/masked-logo.png";
// import FaceBook from "@/assets/facebook.png";


// import { useAuth } from '@/hooks/useAuth';


const { Content, Header, Footer } = Layout;

type Props = {
    children: ReactNode;
    active: string;
    hide?: boolean;
    center?: boolean
}
type MenuItem = Required<MenuProps>['items'][number];
export const NavItem = ({ href, icon, label, active, mobile }: { href: string, icon: ReactNode; label: string; active: boolean; mobile?: boolean}) => {
    return(

    <Link href={href} className={`flex items-center gap-2 ${active ? 'active p-3 rounded-[41px]' : ''}`} >
        {icon} <span className={`header ${active ? 'font-bold' : 'text-[#E5E5E5]' } ${mobile ? 'text-lg! font-semibold text-[#1E1E1E]' : ''} text-text`}>{label}</span> 
    </Link>
)};
const Container = ({
    children,
    active,
    hide,
    center
}:Props) => {
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const router = useRouter();
    const { modal, message } = App.useApp();
  
  return (
    <Layout >
        <Layout>
            <Content className='px-4.5!'>
                <Header className="bg-white! text-[#0C111C]! flex items-center gap-3 justify-between mt-4.5 mb-8 py-4! h-18 md:px-8! rounded-[70px] sticky! top-4.5 z-3" >
                    <div>
                        <Image 
                            src="/menu/TestLogo.svg"
                            alt='test logo'
                            className="cursor-pointer"
                            width={170}
                            height={60}
                            
                        />
                    </div>

                    <div className='flex items-center gap-28'>
                            
                        {!hide && <div className="md:flex items-center gap-10 hidden">
                            <NavItem 
                                icon={<Image src="/menu/home.svg" style={{width:22, height: 17}} alt="Overview" width={22} height={17} />}  href="/overview" 
                                label="Overview" 
                                active={active === 'Overview'} 
                            />

                            <NavItem icon={<Image src="/menu/people.svg" style={{width:22, height: 17}} alt="Patients" width={22} height={17} />} href="/" label="Patients" active={active === 'Patients'} />
                            <NavItem icon={<Image src="/menu/date.svg" style={{width:22, height: 17}} alt="Schedule" width={22} height={17} />} href="/schedule" label="Schedule" active={active === 'Schedule'} />
                            <NavItem icon={<Image src="/menu/message.svg" style={{width:22, height: 17}} alt="Message" width={22} height={17} />} href="/message" label="Message" active={active === 'Message'} />
                            <NavItem icon={<Image src="/menu/card.svg" style={{width:22, height: 17}} alt="Transaction" width={22} height={17} />} href="/transaction" label="Transaction" active={active === 'Transaction'} />

                        </div>}

                        {<div className='flex items-center gap-3.75'>
                            <div className='flex items-center gap-2'>
                                <Image src="/menu/dr.png" alt="facebook" width={44} height={44} className='cursor-pointer h-11 w-11' />
                                <div className='flex flex-col'>
                                    <p className='header'>Dr. Jose Simmons</p>
                                    <p className='text-text text-sm'>General Practitioner</p>
                                </div>
                            </div>
                            
                            <Divider orientation="vertical" style={{height: 44}} />
                            <div className='flex items-center gap-3.75'>
                                <Image src="/menu/setting.svg" style={{width: 19, height: 20}} alt="facebook" width={19} height={20} className='cursor-pointer' />

                                <Image src="/menu/more.svg" style={{width: 19, height: 20}} alt="facebook" width={19} height={20} className='cursor-pointer' />
                            </div>
                        </div>}
                    </div>
                </Header>
                <Layout className={`bg-[#F6F7F8]! ${center && "flex! flex-col! items-center justify-center"}`} >
                    {children}
                </Layout>
            </Content>
        </Layout>
    </Layout>
  )
}

export default Container