export const mergeFetchedResources = function (resources, fetchedResources) {
    resources.forEach((resource, index) => {
        resource = Object.assign(resource, fetchedResources[index]);
    });
};


export const addMetadataToNormalizedShowcase = (normalizedShowcase, showcase, activeTab) => {
    normalizedShowcase.activeShowcaseId = showcase.id;
    normalizedShowcase.activeTabId = activeTab.id;
};
