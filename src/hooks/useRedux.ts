import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../reducers/store'
import { MarkNoteDocument } from '../model/MarkNoteDocument'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<MarkNoteDocument>()