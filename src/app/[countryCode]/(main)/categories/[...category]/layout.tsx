export const runtime = 'edge';

import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { getCategoryByHandle } from '@lib/data/categories'
import { StoreProductCategory } from '@medusajs/types'
import { Box } from '@modules/common/components/box'
import { Container } from '@modules/common/components/container'
import { Heading } from '@modules/common/components/heading'
import StoreBreadcrumbs from '@modules/store/templates/breadcrumbs'

interface CategoryPageLayoutProps {
  children: React.ReactNode
  params: Promise<{ category: string[] }>
}

export async function generateMetadata(
  props: CategoryPageLayoutProps
): Promise<Metadata> {
  const params = await props.params
  const { product_categories } = await getCategoryByHandle(params.category)

  if (!product_categories || !product_categories.length) {
    notFound()
  }

  const title = product_categories
    .map((category: StoreProductCategory) => category.name)
    .join(' | ')

  const description =
    product_categories[product_categories.length - 1].description ??
    `${title} category.`

  return {
    title: `${title} | The Woodenly`,
    description,
    alternates: {
      canonical: `${params.category.join('/')}`,
    },
  }
}

export default async function CategoryPageLayout(
  props: CategoryPageLayoutProps
) {
  const params = await props.params

  const { category } = params

  const { children } = props

  const { product_categories } = await getCategoryByHandle(category)

  if (!product_categories || !product_categories.length) {
    notFound()
  }

  const currentCategory = product_categories[product_categories.length - 1]

  return (
    <>
      <Container className="flex flex-col gap-8 !py-8">
        <Box className="flex flex-col gap-4">
          <StoreBreadcrumbs breadcrumb={currentCategory.name} />
          <Heading
            as="h1"
            className="text-4xl text-basic-primary small:text-5xl"
          >
            {currentCategory.name}
          </Heading>
        </Box>
      </Container>
      {children}
    </>
  )
}
