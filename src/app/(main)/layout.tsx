import SearchBar from './components/SearchBar';
import React from 'react'
import "./main.css"
import StoreProvider from '@/components/ReduxStoreProvider';
import Basket from './components/Basket';
import OrderInProgress from './components/OrderInProgress';
const mainPageLayout = async ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    return (
        <main className='relative h-svh w-screen overflow-clip flex flex-col text-slate-800 bg-stone-50'>
            <StoreProvider>
                <header className='flex justify-center items-center text-gray-900 py-3 gap-3 px-3 md:px-5'>
                    <OrderInProgress />
                    <SearchBar />
                </header>
                <div className='relative flex flex-grow h-view flex-col lg:flex-row'>
                    <section className='flex-grow h-full overflow-y-scroll contentSection z-0'>
                        {children}
                    </section>
                    <Basket />
                </div>
            </StoreProvider>
        </main>
    )
}

export default mainPageLayout