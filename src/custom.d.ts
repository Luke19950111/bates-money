type RootState = {
    recordList: RecordItem[];
    createTagError: Error | null;
    tagList: Tag[];
    currentTag?: Tag;
}

type RecordItem = {
    tags: Tag[];
    notes: string;
    type: string;
    amount: number;
    createdAt?: string;
}
type Tag = {
    id: string;
    name: string;
}
type TagListModel = {
    data: Tag[];
    fetch: () => Tag[];
    create: (name: string) => 'success' | 'duplicated';
    remove: (id: string) => boolean;
    update: (id: string, name: string) => 'success' | 'duplicated' | 'not found';
    save: () => void;
}

