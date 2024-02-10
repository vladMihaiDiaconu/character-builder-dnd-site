
export function transformMenu(data, options = {}) {
  // Map each item in the 'data' array to transform it using the 'transformMenuItem' function.

  return data?.map(transformMenuItem) || []

  function transformMenuItem(item) {
    const isWrapper = item.type === 'WRAPPER'
    const transformedItem = {
      name: item.title,
      path: isWrapper
        ? undefined // If it's a 'WRAPPER', set 'path' to 'undefined'.
        : options.wrapped
          ? item.path.replace(options.parentSlug, '') // If 'options.wrapped' is true, modify the 'path'
          : item.path, // Otherwise, keep the original 'path'.
      type: item.type.toLowerCase(),
    }

    // If the item has a submenu (sub-items), recursively transform the submenu.
    if (hasSubmenu(item)) {
      transformedItem.submenu = transformMenu(item.items, {
        wrapped: isWrapper, // Pass 'isWrapper' to indicate if it's wrapped.
        parentSlug: getParentSlug(item.path),
      })
    }
    return transformedItem
  }

  function hasSubmenu(item) {
    return item.items && item.items.length > 0
  }

  function getParentSlug(path) {
    return '/' + path.split('/').pop()
  }
}



export function generateLinkPath(link) {
  if (typeof link === 'undefined') return ''

  const articalOrPageData = link?.article?.data ?? link?.page?.data
  const href = link?.href

  if (articalOrPageData) {
    const slug = articalOrPageData?.attributes?.slug
    const parentPath =
      articalOrPageData?.attributes?.parentPath ??
      articalOrPageData?.attributes?.resource?.data?.attributes?.parentPath

    if (parentPath) {
      return `/${parentPath}/${slug}`
    } else {
      return `/${slug}`
    }
  }
  return href
}

export function formContactFormData(formData) {
  const obj = {}
  formData.forEach((value, key) => {
    // Check if the key already exists in the JSON object
    if (obj.hasOwnProperty(key)) {
      // If the key already has a value (not an array), convert it to an array
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]]
      }
      // Push the new value to the array
      obj[key].push(value)
    } else {
      // If the key doesn't exist, simply assign the value
      obj[key] = value
    }
  })
  return obj
}

/**
 *
 * @description Displays a page with the correct status code without redirecting
 * @param {Number} status
 * @param {String} url
 * @returns {Response}
 */
export async function status(status, url) {
  const res = await fetch(url)
  return new Response(res.body, {
    headers: res.headers,
    status,
  })
}