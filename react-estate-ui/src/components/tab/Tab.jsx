import React,{useState,lazy,Suspense} from "react";
import './Tab.scss';

const Posts = lazy(()=> import('../posts/Posts'))
const Ads = lazy(()=> import('../ads/Ads'))
const Saved = lazy(()=>import('../saved/Saved'))
const Archived = lazy(()=>import('../Archived/Archived'))

const Tabs = () => {
    const [activeTab,setActiveTab] = useState('posts')

    const renderTabContent = () => {
        switch(activeTab){
            case 'posts':
                return <Posts />
            case 'ads':
                return <Ads />
            case 'saved':
                return <Saved />
            case 'archived':
                return <Archived />
            default:
                return null;
        }
    }

    return (
        <div className="tabs-container">
            <div className="flex-center justify-space-around tabs">
                <button 
                 className={activeTab=='posts'? 'box-shadow active':'box-shadow'}
                 onClick={()=>setActiveTab('posts')}
                 >
                    Posts
                </button>
                <button 
                 className={activeTab=='ads'? 'box-shadow active':'box-shadow'}
                 onClick={()=>setActiveTab('ads')}
                 >
                    Ads
                </button>
                <button 
                 className={activeTab=='saved'? 'box-shadow active':'box-shadow'}
                 onClick={()=>setActiveTab('saved')}
                 >
                    Saved
                </button>
                <button 
                 className={activeTab=='archived'? 'box-shadow active':'box-shadow'}
                 onClick={()=>setActiveTab('archived')}
                 >
                    Archived
                </button>
            </div>
            <div className=" flex justify-space-between flex-center tab-content">
                <Suspense  fallback={<div>Loading...</div>}>
                    {renderTabContent()}
                </Suspense>
            </div>
        </div>
    )
}
export default Tabs
