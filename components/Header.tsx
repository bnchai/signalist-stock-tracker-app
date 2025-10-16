import NavItems from '@/components/NavItems';
import UserDropDown from '@/components/UserDropDown';
import { searchStocks } from '@/lib/actions/finnhub.action';
import Image from 'next/image';
import Link from 'next/link';

interface Props {
  user: User;
}

const Header = async ({ user }: Props) => {
  const initialStocks: StockWithWatchlistStatus[] = await searchStocks();

  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <Link href="/">
          <Image
            src="/assets/icons/logo.svg"
            alt="Signalist logo"
            width={140}
            height={32}
            className="h-8 w-auto cursor-pointer"
          />
        </Link>
        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>
        <UserDropDown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};

export default Header;
