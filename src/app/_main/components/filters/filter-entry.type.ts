import { DataFilter } from '@main/interfaces/filters.interface';
import { FormControl } from '@ngneat/reactive-forms';

export type FilterControl<T, V> = {
  dataFilter: (arg: V) => DataFilter<T, V>;
  control: FormControl<V>;
};

type FilterControls_len_1<A, B> = {
  [key: string]: FilterControl<A, B>;
};

type FilterControls_len_2<A, B, C, D> = {
  [key: string]: FilterControl<A, B> | FilterControl<C, D>;
};

type FilterControls_len_3<A, B, C, D, E, F> = {
  [key: string]: FilterControl<A, B> | FilterControl<C, D> | FilterControl<E, F>;
};

type FilterControls_len_4<A, B, C, D, E, F, G, H> = {
  [key: string]:
    | FilterControl<A, B>
    | FilterControl<C, D>
    | FilterControl<E, F>
    | FilterControl<G, H>;
};

type FilterControls_len_5<A, B, C, D, E, F, G, H, I, J> = {
  [key: string]:
    | FilterControl<A, B>
    | FilterControl<C, D>
    | FilterControl<E, F>
    | FilterControl<G, H>
    | FilterControl<I, J>;
};

type FilterControls_len_6<A, B, C, D, E, F, G, H, I, J, K, L> = {
  [key: string]:
    | FilterControl<A, B>
    | FilterControl<C, D>
    | FilterControl<E, F>
    | FilterControl<G, H>
    | FilterControl<I, J>
    | FilterControl<K, L>;
};

type FilterControls_len_7<A, B, C, D, E, F, G, H, I, J, K, L, M, N> = {
  [key: string]:
    | FilterControl<A, B>
    | FilterControl<C, D>
    | FilterControl<E, F>
    | FilterControl<G, H>
    | FilterControl<I, J>
    | FilterControl<K, L>
    | FilterControl<M, N>;
};

type FilterControls_len_8<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P> = {
  [key: string]:
    | FilterControl<A, B>
    | FilterControl<C, D>
    | FilterControl<E, F>
    | FilterControl<G, H>
    | FilterControl<I, J>
    | FilterControl<K, L>
    | FilterControl<M, N>
    | FilterControl<O, P>;
};

type FilterControls_len_9<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R> = {
  [key: string]:
    | FilterControl<A, B>
    | FilterControl<C, D>
    | FilterControl<E, F>
    | FilterControl<G, H>
    | FilterControl<I, J>
    | FilterControl<K, L>
    | FilterControl<M, N>
    | FilterControl<O, P>
    | FilterControl<Q, R>;
};

type FilterControls_len_10<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T> = {
  [key: string]:
    | FilterControl<A, B>
    | FilterControl<C, D>
    | FilterControl<E, F>
    | FilterControl<G, H>
    | FilterControl<I, J>
    | FilterControl<K, L>
    | FilterControl<M, N>
    | FilterControl<O, P>
    | FilterControl<Q, R>
    | FilterControl<S, T>;
};

export type FilterControls<
  A = any,
  B = any,
  C = any,
  D = any,
  E = any,
  F = any,
  G = any,
  H = any,
  I = any,
  J = any,
  K = any,
  L = any,
  M = any,
  N = any,
  O = any,
  P = any,
  Q = any,
  R = any,
  S = any,
  T = any,
> =
  | FilterControls_len_1<A, B>
  | FilterControls_len_2<A, B, C, D>
  | FilterControls_len_3<A, B, C, D, E, F>
  | FilterControls_len_4<A, B, C, D, E, F, G, H>
  | FilterControls_len_5<A, B, C, D, E, F, G, H, I, J>
  | FilterControls_len_6<A, B, C, D, E, F, G, H, I, J, K, L>
  | FilterControls_len_7<A, B, C, D, E, F, G, H, I, J, K, L, M, N>
  | FilterControls_len_8<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P>
  | FilterControls_len_9<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R>
  | FilterControls_len_10<A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q, R, S, T>;
