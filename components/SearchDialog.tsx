'use client';

import { Loader2Icon, StarIcon, TrendingUpIcon } from 'lucide-react';

import {
  CommandDialog,
  CommandInput,
  CommandList,
} from '@/components/ui/command';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import useDebounce from '@/hooks/useDebounce';
import { searchStocks } from '@/lib/actions/finnhub.action';

export default function SearchDialog({
  initialStocks,
  label = 'Search',
}: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stocks, setStocks] = useState(initialStocks);

  const isSearchMode = !!searchTerm.trim();

  const handleSearch = async () => {
    setIsLoading(true);

    try {
      const results = await searchStocks(searchTerm.trim());
      setStocks(results);
    } catch (error) {
      console.error('Error fetching search result', error);
      setStocks([]);
    } finally {
      setIsLoading(false);
    }
  };

  const debounceSearch = useDebounce(handleSearch, 300);

  useEffect(() => {
    if (!isSearchMode) {
      setStocks(initialStocks);
      return;
    }

    setIsLoading(true);
    debounceSearch();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSelectStock = () => {
    setOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setSearchTerm('');
      setStocks(initialStocks);
    }

    setOpen(open);
  };

  return (
    <>
      <span
        onClick={() => setOpen(true)}
        className="hover:text-yellow-500 transition-colors cursor-pointer"
      >
        {label}
      </span>
      <CommandDialog
        open={open}
        onOpenChange={handleOpenChange}
        className="bg-gray-800 top-24 translate-y-0"
      >
        <div className="relative bg-gray-800 border-b border-gray-600">
          <CommandInput
            value={searchTerm}
            onValueChange={setSearchTerm}
            placeholder="Search by symbol or company name"
            className="bg-gray-800 pr-10 text-gray-400 placeholder:text-gray-500"
          />
          {isLoading && (
            <Loader2Icon className="absolute right-12 top-1/2 -translate-y-1/2 animate-spin text-gray-400 size-4" />
          )}
        </div>
        <CommandList className="bg-gray-800 max-h-[none]">
          {isLoading ? (
            <p className="py-6 text-center text-gray-500">Loading stocks...</p>
          ) : stocks.length === 0 ? (
            <p className="py-6 text-center text-gray-500">
              {isSearchMode ? 'No result found' : 'No stocks available'}
            </p>
          ) : (
            <>
              <div className="py-2 px-4 text-sm font-medium text-gray-400 bg-gray-700 border-b border-gray-700">
                {isSearchMode ? 'Search results' : 'Popular stocks'} (
                {stocks.length || 0})
              </div>
              <ul className="max-h-[300px] overflow-auto scrollbar">
                {stocks.map((stock) => (
                  <li
                    key={stock.symbol}
                    className="py-3 px-2 border-b border-gray-600 last:border-b-0"
                  >
                    <Link
                      href={`/stocks/${stock.symbol}`}
                      onClick={handleSelectStock}
                      className="flex gap-3"
                    >
                      <TrendingUpIcon className="mt-1 size-4 text-gray-500" />
                      <div className="flex-1 flex items-center">
                        <div className="flex-1 space-y-0.5">
                          <p className="font-medium text-gray-400">
                            {stock.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {stock.symbol} • {stock.exchange} • {stock.type}
                          </p>
                        </div>

                        <div className="p-1.5 rounded-full bg-gray-600">
                          <StarIcon className="size-3.5" />
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}
