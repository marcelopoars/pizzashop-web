import { useMutation, useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { getManagedRestaurant, getProfile, signOut } from '@/api'

import { StoreProfileDialog } from './store-profile-dialog'
import {
  Button,
  Dialog,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Skeleton,
} from './ui'

export function AccountMenu() {
  const navigate = useNavigate()

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    staleTime: Infinity,
  })

  const { data: managedRestaurant, isLoading: isLoadingManagedRestaurant } =
    useQuery({
      queryKey: ['managed-restaurant'],
      queryFn: getManagedRestaurant,
      staleTime: Infinity,
      // refetchOnWindowFocus: true, // default
    })

  const { mutateAsync: signOutFn, isPending: isPendingSignOut } = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      navigate('/sign-in', { replace: true })
    },
  })

  function handleSignOut() {
    signOutFn()
  }

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="flex items-center gap-2">
            {isLoadingManagedRestaurant ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              managedRestaurant?.name
            )}

            <ChevronDown className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="grid">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            ) : (
              <>
                <span>{profile?.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger asChild>
            <DropdownMenuItem>
              <Building className="mr-2 size-4" />
              <span>Perfil da loja</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem>
            <button
              className="flex w-full items-center  text-rose-500 dark:text-rose-400"
              onClick={handleSignOut}
              disabled={isPendingSignOut}
            >
              <LogOut className="mr-2 size-4 " />
              <span>Sair</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <StoreProfileDialog />
    </Dialog>
  )
}
