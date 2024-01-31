import { MovieCollectionDialog } from './movie-collection-dialog'
import { tmdbImage } from '@/utils/tmdb/image'
import { Language } from '@/types/languages'
import { getDictionary } from '@/utils/dictionaries'
import { tmdb } from '@/services/tmdb'

type MovieCollectionProps = {
  collectionId: number
  language: Language
}

export const MovieCollection = async ({
  collectionId,
  language,
}: MovieCollectionProps) => {
  const collection = await tmdb.collections.details(collectionId, language)
  const backdropURL = tmdbImage(collection.backdrop_path)
  const dictionary = await getDictionary(language)

  return (
    <div className="relative h-[40vh] overflow-hidden rounded-md border p-8">
      <div
        style={{
          backgroundImage: `url('${backdropURL}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
        className="absolute left-0 top-0 -z-10 h-full w-full brightness-[25%]"
      />

      <div className="flex h-full flex-col justify-end space-y-4">
        <div className="flex flex-col">
          <span className="text-sm text-white">
            {dictionary.movie_collection.part_of}
          </span>

          <span className="text-3xl font-bold text-white">
            {collection.name}
          </span>
        </div>

        <div className="mt-2">
          <MovieCollectionDialog collection={collection} />
        </div>
      </div>
    </div>
  )
}