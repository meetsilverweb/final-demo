// ** Type import
import { HorizontalNavItemsType } from 'src/@core/layouts/types'

const navigation = (): HorizontalNavItemsType => [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'tabler:smart-home'
  },
  {
    title: 'Companies',
    icon: 'tabler:file-dollar',
    children: [
      {
        title: 'Lists',
        path: '/apps/all-company/list'
      },
      {
        title: 'Posts Approval',
        path: '/apps/all-company/posts-approval'
      }
    ]
  },
  {
    title: 'Candidates',
    icon: 'tabler:user',
    children: [
      {
        title: 'List',
        path: '/apps/user/list'
      }
    ]
  },
  {
    title: 'Details',
    icon: 'tabler:smart-home',
    children: [
      {
        title: 'Roles',
        path: '/details/role'
      },
      {
        title: 'Skills',
        path: '/details/skills'
      },
      {
        title: 'Education',
        path: '/details/education'
      },
      {
        title: 'Job Categories',
        path: '/details/job-category'
      }
    ]
  },
  {
    title: 'Token',
    path: '/token',
    icon: 'tabler:user'
  },
  {
    title: 'FAQ',
    path: '/faq',
    icon: 'tabler:user'
  },
  {
    title: 'Privacy Policy',
    path: '/privacy-policy',
    icon: 'tabler:user'
  },
  {
    title: 'Terms Conditions',
    path: '/terms-conditions',
    icon: 'tabler:user'
  }
]

export default navigation
