import { Link } from "react-router-dom";

export default function BuyButton({isAuthenticated, eventId}) {
    console.log('eventid', eventId);
    
    return (
        <>
        {isAuthenticated
              ? <Link to={`/buy?id=${eventId}`}  className="bg-pink-300 h-[60px] rounded-lg text-[1.125rem] justify-center flex items-center w-full">
                  Mua vé ngay
                </Link>
              :<Link to="/auth/login" href="/auth/login" className="bg-pink-300 h-[60px] rounded-lg text-[1.125rem] justify-center flex items-center w-full">
              Đăng nhập để mua vé
            </Link>
            }
        </>
    )
}