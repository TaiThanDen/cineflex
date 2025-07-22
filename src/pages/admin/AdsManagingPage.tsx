import AdsHirerManaging from "@/components/admin/Advertisement/AdsHirerManaging"
import AdsListManaging from "@/components/admin/Advertisement/AdsListManaging"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/react"

const AdsManagingPage = () => {
    return (
        <div className="w-full h-full p-8">
            <TabGroup>
                <TabList className="flex w-full gap-1 mb-4 border-b border-gray-300 overflow-x-auto">
                    <Tab className="border-transparent text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-4 py-2 border-b-2 font-semibold text-sm whitespace-nowrap transition-colors data-[selected]:border-indigo-600 data-[selected]:text-indigo-700 data-[selected]:bg-indigo-50">Đơn vị cung cấp quảng cáo</Tab>
                    <Tab className="border-transparent text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-4 py-2 border-b-2 font-semibold text-sm whitespace-nowrap transition-colors data-[selected]:border-indigo-600 data-[selected]:text-indigo-700 data-[selected]:bg-indigo-50">Quảng cáo</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <AdsHirerManaging />
                    </TabPanel>
                    <TabPanel>
                        <AdsListManaging />
                    </TabPanel>
                </TabPanels>
            </TabGroup>
        </div>
    )
}

export default AdsManagingPage