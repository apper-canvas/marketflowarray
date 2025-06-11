const SkeletonLoader = ({ count = 1, type = 'default' }) => {
  const renderSkeleton = () => {
    switch (type) {
      case 'product-card':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="aspect-square bg-gray-200 animate-pulse"></div>
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        );
      
      case 'product-grid':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="aspect-square bg-gray-200 animate-pulse"></div>
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'cart-item':
        return (
          <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-lg animate-pulse"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="w-16 h-6 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        );
      
      case 'checkout-form':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-6">
            <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="flex justify-end">
              <div className="w-24 h-10 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        );
      
      case 'order-summary':
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-3 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-2 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="w-12 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}
            </div>
            <div className="space-y-2 pt-4 border-t">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'order-confirmation':
        return (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto animate-pulse"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg p-6 shadow-sm space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                  <div className="space-y-2">
                    {[...Array(4)].map((_, j) => (
                      <div key={j} className="flex justify-between">
                        <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      default:
        return (
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            </div>
          </div>
        );
    }
  };

  return (
    <>
      {[...Array(count)].map((_, index) => (
        <div key={index}>
          {renderSkeleton()}
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;