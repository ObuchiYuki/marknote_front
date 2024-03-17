import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch } from '../redux/store'
import { MarkNoteDocument } from '../redux/documentSlice'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<MarkNoteDocument>()