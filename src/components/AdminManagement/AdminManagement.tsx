import React, {
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { BsSearch } from 'react-icons/bs';
import BasicTable from '@/utils/UIs/Table';
import axios from 'axios';
import PaginatedItems from '@/utils/UIs/ReactPagination';
import { useRouter } from 'next/router';
import ViewIcon from '@/utils/UIs/ViewIcon';
import { Button } from '@mui/material';
import Modal from '@/utils/UIs/Modal'
import Cookies from 'universal-cookie'
import AddAdmin from './AddAdmin';

export default function AdminManagement() {
  // curl - X 'GET' \
  // 'https://dev-api.digiex.asia/calobye-be-dev/api/orders/page?page_number=1&page_size=10&asc_sort=false' \
  // -H 'accept: */*' \
  // -H 'Auth-Token: 02d0a36b3dc4436d9cda4d072382c73f'
  const cookies = new Cookies()

  const router: any = useRouter();

  const [token, setToken] = useState(cookies.get('account_token'));
  const [pageNumber, setPageNumber] = useState(0);
  const [callApiPending, setCallApiPending] = useState(false);
  const [instance, setInstance]: any = useState([]);
  const [productsLength, setProductsLength] = useState(0);
  const [checkRegex, setCheckRegex] = useState('');

  // const re = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g;

  const offsets = {
    size: 10,
  };

  const tableHeader = ['Email', 'Fullname', 'Status', 'Action'];

  function createData(email: string, fullname: string, status: string) {
    return [
      {
        content: email,
      },
      fullname,
      status,
      <ViewIcon />
    ] as any;
  }

  async function fetchMyAPI(p = 1, filter_status = '') {
    setCallApiPending(true);

    return await axios
      .get('https://dev-api.digiex.asia/calobye-be-dev/api/admin', {
        params: {
          page_number: p,
          size_number: offsets.size,
          asc_sort: 'false',
        },
        headers: {
          accept: '*/*',
          'Auth-Token': token,
        },
      })
      .then((data: any) => {
        setCheckRegex(data.data.data.content.content);
        setPageNumber(p);
        setProductsLength(data?.data?.data?.total_elements);
        setInstance(
          data?.data?.data?.content?.map((item: any) =>
            createData(
              item.email,
              `${item.first_name} ${item.last_name}`,
              item.status,
            ),
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setCallApiPending(false);
      });;
  }

  useLayoutEffect(() => {
    setInstance([]);

    if (router.query.page) {
      if (router.query.filter_by) {
        fetchMyAPI(router.query.page, router.query.filter_by);
      } else {
        fetchMyAPI(router.query.page, '');
      }
    } else {
      if (router.query.filter_by) {
        fetchMyAPI(router.query.page, router.query.filter_by);
      } else {
        fetchMyAPI(router.query.page, '');
      }
    }
  }, [router.query.page]);

  const filterByValue = (e: any = 'PAID') => {
    setInstance([]);

    const value = e.target.value;
    router.push({
      pathname: '/order',
      query: {
        page: 1,
        filter_by: value,
      },
    });

    fetchMyAPI(1, value);
  };

  return (
    <>
      <div className={`border-gray-200 border-2 p-4 w-3/4 `}>
        <div className={`ml-2 text-3xl w-fit  `}>
          <h1 className={`font-bold`}>Admin Management</h1>
        </div>
        <form action="" className="flex items-center justify-between">
          <div className="flex items-center border-2 w-52 input-icons">
            <span className="icon">
              <BsSearch />
            </span>
            <input
              className="input-field"
              type="text"
              placeholder="Search order code"
            />
          </div>
          <div className="">
            <div className={`text-center`}>
            <Button variant="outlined" className={`hover:bg-indigo-700 rounded bg-indigo-500 text-white px-3 cursor-pointer text-center`}><Modal component={<AddAdmin />}/></Button>
            </div>
          </div>
        </form>
        <div className={`table-container py-4`}>
          <BasicTable
            itemsPerPage={offsets.size}
            rows={instance}
            headers={tableHeader}
            callApiPending={callApiPending}
            component={'admin-management'}
          />
        </div>

        {pageNumber && (
          <div className={`paginator-container`}>
            <PaginatedItems
              itemsPerPage={offsets.size}
              items={productsLength}
              page={pageNumber}
              router={router}
              currentPath={'/admin-management'}
            />
          </div>
        )}
      </div>
    </>
  );
}
